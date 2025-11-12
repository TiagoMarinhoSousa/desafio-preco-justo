import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from './services/post.service';
import { Post } from './models/post.model';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './post-list.page.html',
  styleUrls: ['./post-list.page.css'],
})
export class PostListPage {
  posts$!: Observable<Post[]>;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.posts$ = this.postService
      .getPosts()
      .pipe(map((posts) => posts.slice(0, 10)));
  }
}
