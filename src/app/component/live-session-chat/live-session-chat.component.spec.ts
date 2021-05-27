import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveSessionChatComponent } from './live-session-chat.component';

describe('LiveSessionChatComponent', () => {
  let component: LiveSessionChatComponent;
  let fixture: ComponentFixture<LiveSessionChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveSessionChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveSessionChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
