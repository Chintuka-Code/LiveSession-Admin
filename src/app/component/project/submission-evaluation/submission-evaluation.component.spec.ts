import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionEvaluationComponent } from './submission-evaluation.component';

describe('SubmissionEvaluationComponent', () => {
  let component: SubmissionEvaluationComponent;
  let fixture: ComponentFixture<SubmissionEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmissionEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
