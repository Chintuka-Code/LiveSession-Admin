import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExamSubmissionComponent } from './student-exam-submission.component';

describe('StudentExamSubmissionComponent', () => {
  let component: StudentExamSubmissionComponent;
  let fixture: ComponentFixture<StudentExamSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentExamSubmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentExamSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
