import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '../../core/models/comments.model';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-list.component.html',
})
export class CommentListComponent {
  @Input() comments: Comment[] = [];
  @Output() edit = new EventEmitter<Comment>();
  @Output() delete = new EventEmitter<number>();

  onEdit(comment: Comment): void {
    this.edit.emit(comment);
  }

  onDelete(id: number): void {
    this.delete.emit(id);
  }
}
