
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/core/service/session.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ListComponent } from './list.component';
import { SessionApiService } from 'src/app/core/service/session-api.service';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  const mockSessionService = {
    sessionInformation: {
      admin: true,
      id: 1,
      token: 'token',
      type: 'Bearer',
      username: 'test',
      firstName: 'a',
      lastName: 'b'
    }
  };

  const mockSessionApiService = {
    all: () => of([
      { id: 1, name: 'Session 1', description: 'desc', date: new Date(), teacher_id: 1, users: [1,2] },
      { id: 2, name: 'Session 2', description: 'desc2', date: new Date(), teacher_id: 2, users: [2,3] }
    ])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatCardModule, MatIconModule, ListComponent],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: SessionApiService, useValue: mockSessionApiService },
        { provide: ActivatedRoute, useValue: {} }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return user info', () => {
    expect(component.user).toEqual(mockSessionService.sessionInformation);
  });

  it('should get sessions observable', (done) => {
    component.sessions$.subscribe(sessions => {
      expect(sessions.length).toBe(2);
      expect(sessions[0].name).toBe('Session 1');
      done();
    });
  });
});
