 
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostDetailPage } from '../pages/post-details.page';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CommentService } from '../../../core/services/comments.service';

describe('PostDetailsPage', () => {
  let component: PostDetailPage;
  let fixture: ComponentFixture<PostDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostDetailPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1' // Simula postId como 1
              }
            }
          }
        },
        {
          provide: CommentService,
          useValue: {
            getCommentsByPost: () => of([]),
            comments$: of([])
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar o postId da rota', () => {
    expect(component.postId).toBe(1);
  });
});