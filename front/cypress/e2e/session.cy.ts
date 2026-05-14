// cypress/e2e/session.cy.ts

describe('Session CRUD spec', () => {
  const loggedUser = {
    token: 'fake-jwt-token',
    type: 'Bearer',
    id: 1,
    username: 'userName',
    firstName: 'firstName',
    lastName: 'lastName',
    admin: true,
  };

  const loggedUserNonAdmin = {
    ...loggedUser,
    admin: false,
  };

  const defaultSessions = [
    {
      id: 1,
      name: 'Yoga du matin',
      description: 'Session matin',
      date: '2026-05-01T00:00:00.000Z',
      teacher_id: 1,
      users: [],
      createdAt: '2026-05-01T00:00:00.000Z',
      updatedAt: '2026-05-01T00:00:00.000Z',
    },
  ];

  const teacher = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    createdAt: '2026-05-01T00:00:00.000Z',
    updatedAt: '2026-05-01T00:00:00.000Z',
  };

  const login = (user = loggedUser, sessions = defaultSessions) => {
    cy.intercept({ method: 'POST', url: '/api/auth/login', times: 1 }, { statusCode: 200, body: user }).as('login');
    cy.intercept({ method: 'GET', url: '/api/session', times: 1 }, { statusCode: 200, body: sessions }).as('sessionsOnLogin');
    cy.visit('/login');
    cy.get('input[formControlName=email]').type('user@yoga.test');
    cy.get('input[formControlName=password]').type('test!1234');
    cy.get('button[type=submit]').click();
    cy.wait('@login');
    cy.wait('@sessionsOnLogin');
    cy.url().should('include', '/sessions');
  };


  it('Handles empty session list', () => {
    login(loggedUser, []);
    cy.get('.list .items .item').should('have.length', 0);
  });


  it('Creates a session', () => {
    login();
    cy.intercept('GET', '/api/teacher', { statusCode: 200, body: [teacher] }).as('getTeachers');
    cy.intercept('POST', '/api/session', { statusCode: 201, body: defaultSessions[0] }).as('createSession');
    cy.contains('button', 'Create').click();
    cy.wait('@getTeachers');

    cy.get('input[formControlName=name]').type('Yoga Test');
    cy.get('input[formControlName=date]').type('2026-05-01');
    cy.get('mat-select[formControlName=teacher_id]').click();
    cy.get('mat-option').contains('John Doe').click();
    cy.get('textarea[formControlName=description]').type('Description de test');
    cy.get('button[type=submit]').click();
    cy.wait('@createSession');
    cy.url().should('include', '/sessions');
  });

  it('Disables save with empty fields', () => {
    login();
    cy.intercept('GET', '/api/teacher', { statusCode: 200, body: [teacher] }).as('getTeachers');
    cy.contains('button', 'Create').click();
    cy.wait('@getTeachers');
    cy.get('button[type=submit]').should('be.disabled');
  });


  it('Deletes a session', () => {
    login();
    cy.intercept('GET', '/api/session/1', { statusCode: 200, body: defaultSessions[0] }).as('detailSession');
    cy.intercept('GET', '/api/teacher/1', { statusCode: 200, body: teacher }).as('detailTeacher');
    cy.intercept('DELETE', '/api/session/1', { statusCode: 200, body: {} }).as('deleteSession');

    cy.contains('button', 'Detail').first().click();
    cy.wait('@detailSession');
    cy.wait('@detailTeacher');
    cy.contains('button', 'Delete').click();
    cy.wait('@deleteSession');
    cy.url().should('include', '/sessions');
  });

});
