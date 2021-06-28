import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomFieldsComponent } from './view-custom-fields.component';

describe('ViewCustomFieldsComponent', () => {
  let component: ViewCustomFieldsComponent;
  let fixture: ComponentFixture<ViewCustomFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCustomFieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCustomFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
