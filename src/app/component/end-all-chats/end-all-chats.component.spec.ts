import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndAllChatsComponent } from './end-all-chats.component';

describe('EndAllChatsComponent', () => {
  let component: EndAllChatsComponent;
  let fixture: ComponentFixture<EndAllChatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndAllChatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndAllChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
