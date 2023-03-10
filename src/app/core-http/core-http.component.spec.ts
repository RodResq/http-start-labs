import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreHttpComponent } from './core-http.component';

describe('CoreHttpComponent', () => {
  let component: CoreHttpComponent;
  let fixture: ComponentFixture<CoreHttpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreHttpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreHttpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
