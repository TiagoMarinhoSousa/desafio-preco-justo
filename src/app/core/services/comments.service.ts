import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Comment } from '../../core/models/comments.model';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/comments';
  private commentsSubject = new BehaviorSubject<Comment[]>([]);
  comments$ = this.commentsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCommentsByPost(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}?postId=${postId}`).pipe(
      tap((comments) => {
        const sorted = comments.sort((a, b) => b.id! - a.id!); // mais novos primeiro
        this.commentsSubject.next(sorted);
      })
    );
  }

  addComment(comment: Comment): Observable<Comment> {
  const tempId = Math.floor(Math.random() * 1000000);
  const optimisticComment = { ...comment, id: tempId };

  const current = this.commentsSubject.value;
  this.commentsSubject.next(
    [optimisticComment, ...current].sort((a, b) => b.id! - a.id!)
  );

  return this.http.post<Comment>(this.apiUrl, comment).pipe(
    tap((realComment) => {
      const updated = this.commentsSubject.value.map(c =>
        c.id === tempId ? realComment : c
      );
      this.commentsSubject.next(updated.sort((a, b) => b.id! - a.id!));
    }),
    catchError((err) => {
      const rolledBack = this.commentsSubject.value.filter(c => c.id !== tempId);
      this.commentsSubject.next(rolledBack.sort((a, b) => b.id! - a.id!));
      return throwError(() => err);
    })
  );
}

  updateComment(comment: Comment): Observable<Comment> {
    const original = [...this.commentsSubject.value];
    const updatedList = original.map(c => c.id === comment.id ? comment : c);
    this.commentsSubject.next(updatedList.sort((a, b) => b.id! - a.id!));

    return this.http.put<Comment>(`${this.apiUrl}/${comment.id}`, comment).pipe(
      catchError((err) => {
        this.commentsSubject.next(original.sort((a, b) => b.id! - a.id!));
        return throwError(() => err);
      })
    );
  }

  deleteComment(id: number): Observable<void> {
    const original = [...this.commentsSubject.value];
    const filtered = original.filter(c => c.id !== id);
    this.commentsSubject.next(filtered.sort((a, b) => b.id! - a.id!));

    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((err) => {
        this.commentsSubject.next(original.sort((a, b) => b.id! - a.id!));
        return throwError(() => err);
      })
    );
  }



}
