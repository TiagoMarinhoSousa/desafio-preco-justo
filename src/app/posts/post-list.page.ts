import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from './services/post.service';
import { Post } from './models/post.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PostFormComponent } from './components/post-form.component';
import { ModalComponent } from '../shared/components/modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PostFormComponent, ModalComponent],
  templateUrl: './post-list.page.html',
})
export class PostListPage {
  private postsSubject = new BehaviorSubject<Post[]>([]);
  posts$ = this.postsSubject.asObservable();

  searchTerm = '';
  sortColumn: keyof Post = 'id';
  sortAsc = false;
  currentPage = 1;
  pageSize = 10;
  showModal = false;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts) => {
      this.postsSubject.next(posts);
    });
  }

  get filteredPosts$(): Observable<Post[]> {
    return this.posts$.pipe(
      map((posts) =>
        posts
          .filter((post) =>
            (post.title + post.body)
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase())
          )
          .sort((a, b) => {
            const fieldA = a[this.sortColumn] ?? '';
            const fieldB = b[this.sortColumn] ?? '';

            if (this.sortColumn === 'id') {
              return this.sortAsc
                ? Number(fieldA) - Number(fieldB)
                : Number(fieldB) - Number(fieldA);
            }

            return this.sortAsc
              ? String(fieldA).localeCompare(String(fieldB))
              : String(fieldB).localeCompare(String(fieldA));
          })
          .slice(
            (this.currentPage - 1) * this.pageSize,
            this.currentPage * this.pageSize
          )
      )
    );
  }

  handleModalSubmit(post: Post): void {
    const currentPosts = this.postsSubject.getValue();
    const optimisticPosts = [post, ...currentPosts];
    this.postsSubject.next(optimisticPosts);

    this.postService
      .createPost(post)
      .pipe(
        catchError(() => {
          // rollback em caso de erro
          this.postsSubject.next(currentPosts);
          return [];
        })
      )
      .subscribe((created) => {
        // substitui o post otimista pelo retornado da API
        const updatedPosts = [created, ...currentPosts];
        this.postsSubject.next(updatedPosts);
      });

    this.showModal = false;
  }

  toggleSort(column: keyof Post): void {
    if (this.sortColumn === column) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortColumn = column;
      this.sortAsc = true;
    }
  }
}
