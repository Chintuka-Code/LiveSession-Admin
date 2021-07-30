import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveSessionMultiComponent } from './live-session-multi.component';

describe('LiveSessionMultiComponent', () => {
  let component: LiveSessionMultiComponent;
  let fixture: ComponentFixture<LiveSessionMultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveSessionMultiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveSessionMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
