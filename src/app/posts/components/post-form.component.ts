import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-form.component.html',
})
export class PostFormComponent {
  newPost: Partial<Post> = {
    title: '',
    body: '',
  };

  @Output() submitPost = new EventEmitter<Post>();

  onSubmit(): void {
    if (this.newPost.title && this.newPost.body) {
      this.submitPost.emit(this.newPost as Post);
      this.newPost = { title: '', body: '' };
    }
  }
}