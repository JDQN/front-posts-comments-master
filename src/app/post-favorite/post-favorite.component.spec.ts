import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFavoriteComponent } from './post-favorite.component';

describe('PostFavoriteComponent', () => {
  let component: PostFavoriteComponent;
  let fixture: ComponentFixture<PostFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostFavoriteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
