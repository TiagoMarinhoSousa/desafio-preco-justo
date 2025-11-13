import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../comments/services/comments.service';
import { Comment } from '../../comments/models/comments.model'
import { CommentListComponent } from '../../comments/components/comment-list/comment-list.component';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, CommentListComponent],
  templateUrl: './post-details.page.html',
})
export class PostDetailPage implements OnInit {
  postId!: number;
  comments: Comment[] = [];
  loading = true;

  constructor(private route: ActivatedRoute, private commentService: CommentService) {}

  ngOnInit(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    this.commentService.getCommentsByPost(this.postId).subscribe({
      next: (data) => {
        this.comments = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}