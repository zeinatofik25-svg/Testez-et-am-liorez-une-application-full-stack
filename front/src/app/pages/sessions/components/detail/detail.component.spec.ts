import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule, } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from '../../../../core/service/session.service';

import { DetailComponent } from './detail.component';


describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let service: SessionService;

  const mockSessionService = {
    sessionInformation: {
      admin: true,
      id: 1
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        DetailComponent
      ],
      providers: [{ provide: SessionService, useValue: mockSessionService }],
    })
      .compileComponents();
      service = TestBed.inject(SessionService);
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call back()', () => {
    const spy = jest.spyOn(window.history, 'back');
    component.back();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should call delete() and handle response', () => {
    const sessionApiService = component['sessionApiService'];
    const matSnackBar = component['matSnackBar'];
    const router = component['router'];
    jest.spyOn(sessionApiService, 'delete').mockReturnValue({ pipe: () => ({ subscribe: (cb: any) => cb() }) } as any);
    const snackSpy = jest.spyOn(matSnackBar, 'open');
    const navSpy = jest.spyOn(router, 'navigate');
    component.delete();
    expect(snackSpy).toHaveBeenCalled();
    expect(navSpy).toHaveBeenCalledWith(['sessions']);
  });

  it('should call participate() and handle response', () => {
    const sessionApiService = component['sessionApiService'];
    jest.spyOn(sessionApiService, 'participate').mockReturnValue({ pipe: () => ({ subscribe: (cb: any) => cb() }) } as any);
    const fetchSpy = jest.spyOn<any, any>(component, 'fetchSession').mockImplementation(() => {});
    component.participate();
    expect(sessionApiService.participate).toHaveBeenCalled();
    expect(fetchSpy).toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it('should call unParticipate() and handle response', () => {
    const sessionApiService = component['sessionApiService'];
    jest.spyOn(sessionApiService, 'unParticipate').mockReturnValue({ pipe: () => ({ subscribe: (cb: any) => cb() }) } as any);
    const fetchSpy = jest.spyOn<any, any>(component, 'fetchSession').mockImplementation(() => {});
    component.unParticipate();
    expect(sessionApiService.unParticipate).toHaveBeenCalled();
    expect(fetchSpy).toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it('should call fetchSession() and set session/teacher', () => {
    const sessionApiService = component['sessionApiService'];
    const teacherService = component['teacherService'];
    const fakeSession = { users: [1], teacher_id: 2 };
    const fakeTeacher = { id: 2 };
    jest.spyOn(sessionApiService, 'detail').mockReturnValue({ pipe: () => ({ subscribe: (cb: any) => cb(fakeSession) }) } as any);
    jest.spyOn(teacherService, 'detail').mockReturnValue({ pipe: () => ({ subscribe: (cb: any) => cb(fakeTeacher) }) } as any);
    component['fetchSession']();
    expect(component.session).toEqual(fakeSession as any);
    expect(component.teacher).toEqual(fakeTeacher as any);
    expect(component.isParticipate).toBe(true);
  });

  it('should call ngOnInit and fetchSession', () => {
    const fetchSpy = jest.spyOn<any, any>(component, 'fetchSession').mockImplementation(() => {});
    component.ngOnInit();
    expect(fetchSpy).toHaveBeenCalled();
    fetchSpy.mockRestore();
  });
});

