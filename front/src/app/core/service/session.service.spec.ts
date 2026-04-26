import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { SessionService } from './session.service';

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in and update state', (done) => {
    const user = { token: 'abc', type: 'Bearer', id: 1, username: 'test', firstName: 'a', lastName: 'b', admin: true };
    service.logIn(user);
    expect(service.sessionInformation).toEqual(user);
    expect(service.isLogged).toBe(true);
    service.$isLogged().subscribe(val => {
      expect(val).toBe(true);
      done();
    });
  });

  it('should log out and update state', (done) => {
    const user = { token: 'abc', type: 'Bearer', id: 1, username: 'test', firstName: 'a', lastName: 'b', admin: true };
    service.logIn(user);
    service.logOut();
    expect(service.sessionInformation).toBeUndefined();
    expect(service.isLogged).toBe(false);
    service.$isLogged().subscribe(val => {
      expect(val).toBe(false);
      done();
    });
  });
});
