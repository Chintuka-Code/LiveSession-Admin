import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerModeComponent } from './trainer-mode.component';

describe('TrainerModeComponent', () => {
  let component: TrainerModeComponent;
  let fixture: ComponentFixture<TrainerModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
