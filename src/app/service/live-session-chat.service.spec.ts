import { TestBed } from '@angular/core/testing';

import { LiveSessionChatService } from './live-session-chat.service';

describe('LiveSessionChatService', () => {
  let service: LiveSessionChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveSessionChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
