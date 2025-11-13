import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../../core/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.API_URL);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.API_URL, post);
  }

updatePost(post: Post): Observable<Post> {
  return this.http.put<Post>(`${this.API_URL}/${post.id}`, post);
}
deletePost(id: number): Observable<void> {
  return this.http.delete<void>(`${this.API_URL}/${id}`);
}


}
