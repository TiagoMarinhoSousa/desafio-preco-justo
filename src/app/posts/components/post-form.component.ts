import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-form.component.html',
})
export class PostFormComponent implements OnChanges {
  @Input() post: Post | null = null;
  @Output() submitPost = new EventEmitter<Post>();

  formData: Post = {
    title: '',
    body: '',
  };

  ngOnChanges(): void {
    if (this.post) {
      this.formData = { ...this.post };
    }
  }

  onSubmit(): void {
    this.submitPost.emit(this.formData);
  }

  @Output() cancel = new EventEmitter<void>();
}