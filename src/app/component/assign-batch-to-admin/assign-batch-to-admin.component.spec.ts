import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignBatchToAdminComponent } from './assign-batch-to-admin.component';

describe('AssignBatchToAdminComponent', () => {
  let component: AssignBatchToAdminComponent;
  let fixture: ComponentFixture<AssignBatchToAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignBatchToAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignBatchToAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
