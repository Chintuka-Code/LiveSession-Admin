import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFromExistingQuestionComponent } from './add-from-existing-question.component';

describe('AddFromExistingQuestionComponent', () => {
  let component: AddFromExistingQuestionComponent;
  let fixture: ComponentFixture<AddFromExistingQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFromExistingQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFromExistingQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
