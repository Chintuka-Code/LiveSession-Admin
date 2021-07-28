import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeBatchComponent } from './change-batch.component';

describe('ChangeBatchComponent', () => {
  let component: ChangeBatchComponent;
  let fixture: ComponentFixture<ChangeBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeBatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
