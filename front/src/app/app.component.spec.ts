import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';

import { AppComponent } from './app.component';


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatToolbarModule,
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call $isLogged and return observable', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const obs = app.$isLogged();
    expect(obs.subscribe).toBeDefined();
  });

  it('should call logout and navigate', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const sessionService = app['sessionService'];
    const router = app['router'];
    const spyLogout = jest.spyOn(sessionService, 'logOut');
    const spyNavigate = jest.spyOn(router, 'navigate');
    app.logout();
    expect(spyLogout).toHaveBeenCalled();
    expect(spyNavigate).toHaveBeenCalledWith(['']);
  });
});
