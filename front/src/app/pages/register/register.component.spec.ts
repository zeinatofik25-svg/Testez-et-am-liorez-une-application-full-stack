import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { expect } from '@jest/globals';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,  
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        RegisterComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call submit() and handle success', () => {
    const authService = component['authService'];
    const router = component['router'];
    jest.spyOn(authService, 'register').mockReturnValue({ pipe: () => ({ subscribe: (obj: any) => obj.next() }) } as any);
    const spyNavigate = jest.spyOn(router, 'navigate');
    component.form.setValue({ email: 'test@test.com', firstName: 'a', lastName: 'b', password: 'pass' });
    component.submit();
    expect(spyNavigate).toHaveBeenCalledWith(['/login']);
  });

  it('should call submit() and handle error', () => {
    const authService = component['authService'];
    jest.spyOn(authService, 'register').mockReturnValue({ pipe: () => ({ subscribe: (obj: any) => obj.error('err') }) } as any);
    component.form.setValue({ email: 'test@test.com', firstName: 'a', lastName: 'b', password: 'pass' });
    component.submit();
    expect(component.onError).toBe(true);
  });
});
