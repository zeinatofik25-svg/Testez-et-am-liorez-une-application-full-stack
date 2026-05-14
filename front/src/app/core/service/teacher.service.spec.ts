import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { TeacherService } from './teacher.service';
import { Teacher } from '../models/teacher.interface';

describe('TeacherService', () => {
  let service: TeacherService;
  let httpClient: { get: jest.Mock };

  beforeEach(() => {
    httpClient = { get: jest.fn() };
    service = new TeacherService(httpClient as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call all() and return teachers', () => {
    const teachers: Teacher[] = [{
      id: 1,
      firstName: 'A',
      lastName: 'B',
      createdAt: new Date(),
      updatedAt: new Date()
    }];
    httpClient.get.mockReturnValue(of(teachers));
    service.all().subscribe(result => {
      expect(result).toEqual(teachers);
    });
    expect(httpClient.get).toHaveBeenCalledWith('api/teacher');
  });

  it('should call detail() and return a teacher', () => {
    const teacher: Teacher = {
      id: 1,
      firstName: 'A',
      lastName: 'B',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    httpClient.get.mockReturnValue(of(teacher));
    service.detail('1').subscribe(result => {
      expect(result).toEqual(teacher);
    });
    expect(httpClient.get).toHaveBeenCalledWith('api/teacher/1');
  });
});
