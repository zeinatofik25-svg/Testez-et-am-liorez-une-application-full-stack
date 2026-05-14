import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { SessionService } from '../core/service/session.service';
import { customJwtInterceptorFn } from './customJwtInterceptorFn';


import type { SessionInformation } from '../core/models/sessionInformation.interface';

describe('customJwtInterceptorFn', () => {
  const sessionServiceMock: { isLogged: boolean; sessionInformation: SessionInformation | undefined } = {
    isLogged: false,
    sessionInformation: undefined,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SessionService, useValue: sessionServiceMock },
      ],
    });
  });

  afterEach(() => {
    sessionServiceMock.isLogged = false;
    sessionServiceMock.sessionInformation = undefined;
    jest.clearAllMocks();
  });

  it('should not add Authorization header if not logged in', (done) => {
    const request = new HttpRequest('GET', '/test');
    const next = jest.fn((req: HttpRequest<unknown>) =>
      of(new HttpResponse({ status: 200 }))
    );

    TestBed.runInInjectionContext(() => {
      customJwtInterceptorFn(request, next).subscribe(() => {
        expect(next).toHaveBeenCalledWith(request);
        done();
      });
    });
  });

  it('should add Authorization header if logged in', (done) => {
    sessionServiceMock.isLogged = true;
    sessionServiceMock.sessionInformation = {
      token: 'my-token',
      type: 'Bearer',
      id: 1,
      username: 'testuser',
      firstName: 'Test',
      lastName: 'User',
      admin: false
    };

    const request = new HttpRequest('GET', '/test');
    const next = jest.fn((req: HttpRequest<unknown>) =>
      of(new HttpResponse({ status: 200 }))
    );

    TestBed.runInInjectionContext(() => {
      customJwtInterceptorFn(request, next).subscribe(() => {
        const modifiedRequest = next.mock.calls[0][0] as HttpRequest<unknown>;

        expect(modifiedRequest.headers.get('Authorization')).toBe('Bearer my-token');
        expect(modifiedRequest).not.toBe(request);
        done();
      });
    });
  });
});
