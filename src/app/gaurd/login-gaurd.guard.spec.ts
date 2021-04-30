import { TestBed } from '@angular/core/testing';

import { LoginGaurdGuard } from './login-gaurd.guard';

describe('LoginGaurdGuard', () => {
  let guard: LoginGaurdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginGaurdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
