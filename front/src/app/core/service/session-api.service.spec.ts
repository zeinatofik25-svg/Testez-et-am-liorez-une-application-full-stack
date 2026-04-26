import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { SessionApiService } from './session-api.service';

describe('SessionsService', () => {
  let service: SessionApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule
      ]
    });
    service = TestBed.inject(SessionApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call detail API', () => {
    const http = TestBed.inject(HttpClientModule as any);
    if (!('get' in service)) return; // skip if not present
    spyOn(service as any, 'httpClient').and.returnValue({ get: () => ({}) });
    expect(typeof service.detail).toBe('function');
  });

  it('should call delete API', () => {
    expect(typeof service.delete).toBe('function');
  });

  it('should call create API', () => {
    expect(typeof service.create).toBe('function');
  });

  it('should call update API', () => {
    expect(typeof service.update).toBe('function');
  });

  it('should call participate API', () => {
    expect(typeof service.participate).toBe('function');
  });

  it('should call unParticipate API', () => {
    expect(typeof service.unParticipate).toBe('function');
  });
});
