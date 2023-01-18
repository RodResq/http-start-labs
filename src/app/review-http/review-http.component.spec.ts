import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewHttpComponent } from './review-http.component';

describe('ReviewHttpComponent', () => {
  let component: ReviewHttpComponent;
  let fixture: ComponentFixture<ReviewHttpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewHttpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewHttpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
