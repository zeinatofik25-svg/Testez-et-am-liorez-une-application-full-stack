import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/core/service/session.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        LoginComponent
      ],
      providers: [SessionService],
    })
      .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call submit() and handle success', () => {
    const authService = component['authService'];
    const sessionService = component['sessionService'];
    const router = component['router'];
    const mockResponse = { token: 'abc', type: 'Bearer', id: 1, username: 'test', firstName: 'a', lastName: 'b', admin: false };
    jest.spyOn(authService, 'login').mockReturnValue({ pipe: () => ({ subscribe: (obj: any) => obj.next(mockResponse) }) } as any);
    const spyLogIn = jest.spyOn(sessionService, 'logIn');
    const spyNavigate = jest.spyOn(router, 'navigate');
    component.form.setValue({ email: 'test@test.com', password: 'pass' });
    component.submit();
    expect(spyLogIn).toHaveBeenCalledWith(mockResponse);
    expect(spyNavigate).toHaveBeenCalledWith(['/sessions']);
  });

  it('should call submit() and handle error', () => {
    const authService = component['authService'];
    jest.spyOn(authService, 'login').mockReturnValue({ pipe: () => ({ subscribe: (obj: any) => obj.error('err') }) } as any);
    component.form.setValue({ email: 'test@test.com', password: 'pass' });
    component.submit();
    expect(component.onError).toBe(true);
  });
});
