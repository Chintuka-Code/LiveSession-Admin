import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuestionFromCsvComponent } from './create-question-from-csv.component';

describe('CreateQuestionFromCsvComponent', () => {
  let component: CreateQuestionFromCsvComponent;
  let fixture: ComponentFixture<CreateQuestionFromCsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateQuestionFromCsvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQuestionFromCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
