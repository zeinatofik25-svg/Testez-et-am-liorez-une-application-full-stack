import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../models/user.interface';

describe('UserService', () => {
  let service: UserService;
  let httpClient: { get: jest.Mock; delete: jest.Mock };

  beforeEach(() => {
    httpClient = { get: jest.fn(), delete: jest.fn() };
    service = new UserService(httpClient as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getById() and return a user', () => {
    const user: User = {
      id: 1,
      email: 'a@b.com',
      firstName: 'A',
      lastName: 'B',
      admin: false,
      password: 'secret',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    httpClient.get.mockReturnValue(of(user));
    service.getById('1').subscribe(result => {
      expect(result).toEqual(user);
    });
    expect(httpClient.get).toHaveBeenCalledWith('api/user/1');
  });

  it('should call delete() and return void', () => {
    httpClient.delete.mockReturnValue(of(undefined));
    service.delete('1').subscribe(result => {
      expect(result).toBeUndefined();
    });
    expect(httpClient.delete).toHaveBeenCalledWith('api/user/1');
  });
});
