import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStudentProfileComponent } from './update-student-profile.component';

describe('UpdateStudentProfileComponent', () => {
  let component: UpdateStudentProfileComponent;
  let fixture: ComponentFixture<UpdateStudentProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateStudentProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStudentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
