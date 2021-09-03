import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssignProjectComponent } from './create-assign-project.component';

describe('CreateAssignProjectComponent', () => {
  let component: CreateAssignProjectComponent;
  let fixture: ComponentFixture<CreateAssignProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAssignProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAssignProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
