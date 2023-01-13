import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpWithObservableComponent } from './http-with-observable.component';

describe('HttpWithObservableComponent', () => {
  let component: HttpWithObservableComponent;
  let fixture: ComponentFixture<HttpWithObservableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpWithObservableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpWithObservableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
