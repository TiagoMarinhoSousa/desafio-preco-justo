import { Routes } from '@angular/router';
import { PostListPage } from './features/posts/pages/post-list.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full'
  },
  {
    path: 'posts',
    component: PostListPage
  },
  {
    path: 'posts/:id',
    loadComponent: () => import('./features/posts/pages/post-details.page').then(m => m.PostDetailPage)
  }
];
