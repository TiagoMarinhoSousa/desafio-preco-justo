import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Comment } from '../../models/comments.model';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-form.component.html',
})
export class CommentFormComponent {
  @Input() comment: Comment = { postId: 0, name: '', email: '', body: '' };
  @Output() submitComment = new EventEmitter<Comment>();
  @Output() cancel = new EventEmitter<void>();

  onSubmit(): void {
    this.submitComment.emit(this.comment);
  }
}