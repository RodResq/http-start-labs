import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpWithPromisseComponent } from './http-with-promisse.component';

describe('HttpWithPromisseComponent', () => {
  let component: HttpWithPromisseComponent;
  let fixture: ComponentFixture<HttpWithPromisseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpWithPromisseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpWithPromisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
