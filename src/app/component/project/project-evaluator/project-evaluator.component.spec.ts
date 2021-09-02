import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEvaluatorComponent } from './project-evaluator.component';

describe('ProjectEvaluatorComponent', () => {
  let component: ProjectEvaluatorComponent;
  let fixture: ComponentFixture<ProjectEvaluatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectEvaluatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEvaluatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
