import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentIntoBatchComponent } from './add-student-into-batch.component';

describe('AddStudentIntoBatchComponent', () => {
  let component: AddStudentIntoBatchComponent;
  let fixture: ComponentFixture<AddStudentIntoBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentIntoBatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentIntoBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
