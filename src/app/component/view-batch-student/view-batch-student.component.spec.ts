import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBatchStudentComponent } from './view-batch-student.component';

describe('ViewBatchStudentComponent', () => {
  let component: ViewBatchStudentComponent;
  let fixture: ComponentFixture<ViewBatchStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBatchStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBatchStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
