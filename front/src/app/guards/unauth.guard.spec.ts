import { UnauthGuard } from './unauth.guard';
import { Router } from '@angular/router';
import { SessionService } from '../core/service/session.service';

describe('UnauthGuard', () => {
  let guard: UnauthGuard;
  let router: { navigate: jest.Mock };
  let sessionService: { isLogged: boolean };

  beforeEach(() => {
    router = { navigate: jest.fn() };
    sessionService = { isLogged: false };
    guard = new UnauthGuard(router as any, sessionService as any);
  });

  it('should return false and redirect if already logged in', () => {
    sessionService.isLogged = true;
    expect(guard.canActivate()).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['rentals']);
  });

  it('should return true if not logged in', () => {
    sessionService.isLogged = false;
    expect(guard.canActivate()).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
