import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {  ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/core/service/session.service';
import { SessionApiService } from '../../../../core/service/session-api.service';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  const mockSessionService = {
    sessionInformation: {
      admin: true
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatSelectModule,
        BrowserAnimationsModule,
        FormComponent
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        SessionApiService
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call submit() for create', () => {
    component.onUpdate = false;
    component.sessionForm = { value: { name: 's', description: 'd', date: new Date(), teacher_id: 1, users: [] } } as any;
    const sessionApiService = component['sessionApiService'];
    const spyCreate = jest.spyOn(sessionApiService, 'create').mockReturnValue({ pipe: () => ({ subscribe: (cb: any) => cb({}) }) } as any);
    const exitSpy = jest.spyOn(component as any, 'exitPage').mockImplementation();
    component.submit();
    expect(spyCreate).toHaveBeenCalled();
    expect(exitSpy).toHaveBeenCalled();
  });

  it('should call submit() for update', () => {
    component.onUpdate = true;
    component.sessionForm = { value: { name: 's', description: 'd', date: new Date(), teacher_id: 1, users: [] } } as any;
    component['id'] = '1';
    const sessionApiService = component['sessionApiService'];
    const spyUpdate = jest.spyOn(sessionApiService, 'update').mockReturnValue({ pipe: () => ({ subscribe: (cb: any) => cb({}) }) } as any);
    const exitSpy = jest.spyOn(component as any, 'exitPage').mockImplementation();
    component.submit();
    expect(spyUpdate).toHaveBeenCalled();
    expect(exitSpy).toHaveBeenCalled();
  });
});
