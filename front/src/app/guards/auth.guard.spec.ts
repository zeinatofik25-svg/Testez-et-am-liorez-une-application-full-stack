import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { SessionService } from '../core/service/session.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: { navigate: jest.Mock };
  let sessionService: { isLogged: boolean };

  beforeEach(() => {
    router = { navigate: jest.fn() };
    sessionService = { isLogged: false };
    guard = new AuthGuard(router as any, sessionService as any);
  });

  it('should return false and redirect if not logged in', () => {
    sessionService.isLogged = false;
    expect(guard.canActivate()).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should return true if logged in', () => {
    sessionService.isLogged = true;
    expect(guard.canActivate()).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
