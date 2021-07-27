import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamInstructionComponent } from './exam-instruction.component';

describe('ExamInstructionComponent', () => {
  let component: ExamInstructionComponent;
  let fixture: ComponentFixture<ExamInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamInstructionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
