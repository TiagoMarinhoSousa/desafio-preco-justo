import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../../core/services/comments.service';
import { Comment } from '../../../core/models/comments.model';
import { CommentListComponent } from '../../comments/comment-list.component';
import { catchError, Observable, of, tap } from 'rxjs';
import { RouterModule } from '@angular/router';
import { ModalComponent } from 'src/app/shared/components/modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    CommonModule,
    CommentListComponent,
    RouterModule,
    ModalComponent,
    FormsModule,
  ],
  templateUrl: './post-details.page.html',
})
export class PostDetailPage implements OnInit {
  postId!: number;
  comments$!: Observable<Comment[]>;

  commentModalVisible = false;
  confirmModalVisible = false;
  commentToDelete: number | null = null;
  editingComment: Comment | null = null;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    this.isLoading = true;

    this.commentService
      .getCommentsByPost(this.postId)
      .pipe(
        catchError((err) => {
          this.errorMessage = 'Erro ao carregar os comentários.';
          this.isLoading = false;
          return of([]);
        }),
        tap(() => (this.isLoading = false))
      )
      .subscribe();

    this.comments$ = this.commentService.comments$;
  }

  onAddComment(): void {
    this.editingComment = {
      postId: this.postId,
      name: '',
      email: '',
      body: '',
    };
    this.commentModalVisible = true;
  }

  onEditComment(comment: Comment): void {
    this.editingComment = { ...comment };
    this.commentModalVisible = true;
  }

  onDeleteComment(id: number): void {
    this.commentToDelete = id;
    this.confirmModalVisible = true; // ← abre o modal, não exclui ainda
  }

  onSubmitComment(comment: Comment): void {
    if (comment.id) {
      this.commentService.updateComment(comment).subscribe(() => {
        this.resetModals();
      });
    } else {
      this.commentService.addComment(comment).subscribe(() => {
        this.resetModals();
      });
    }
  }

  resetModals(): void {
    this.commentModalVisible = false;
    this.confirmModalVisible = false;
    this.editingComment = null;
    this.commentToDelete = null;
  }

  onConfirmDelete(): void {
    if (this.commentToDelete !== null) {
      this.commentService.deleteComment(this.commentToDelete).subscribe(() => {
        this.resetModals();
      });
    }
  }
}
