// cypress/e2e/session.cy.ts

describe('Session CRUD spec', () => {
  beforeEach(() => {
    cy.loginByApi();
    cy.visit('/sessions');
  });


  it('Displays session list', () => {
    cy.intercept('GET', '/api/session', { fixture: 'sessions.json' }).as('getSessions');
    cy.reload();
    cy.get('.session-list').should('exist');
    cy.get('.session-list .session-item').should('have.length.greaterThan', 0);
  });

  it('Handles empty session list', () => {
    cy.intercept('GET', '/api/session', []).as('getSessions');
    cy.reload();
    cy.get('.session-list .session-item').should('have.length', 0);
  });


  it('Creates a session', () => {
    cy.intercept('POST', '/api/session', { statusCode: 201 }).as('createSession');
    cy.get('button[aria-label=create-session]').click();
    cy.get('input[formControlName=title]').type('Yoga Test');
    cy.get('input[formControlName=teacher]').type('Professeur X');
    cy.get('input[formControlName=date]').type('2026-05-01');
    cy.get('button[type=submit]').click();
    cy.url().should('include', '/sessions');
  });

  it('Fails to create a session with empty fields', () => {
    cy.get('button[aria-label=create-session]').click();
    cy.get('button[type=submit]').click();
    cy.get('input[formControlName=title]:invalid').should('exist');
    cy.get('input[formControlName=teacher]:invalid').should('exist');
    cy.get('input[formControlName=date]:invalid').should('exist');
  });


  it('Deletes a session', () => {
    cy.intercept('DELETE', '/api/session/*', { statusCode: 200 }).as('deleteSession');
    cy.get('.session-item:first .delete-btn').click();
    cy.get('.mat-snack-bar-container').should('contain', 'Session deleted');
  });

  it('Fails to delete a session (error)', () => {
    cy.intercept('DELETE', '/api/session/*', { statusCode: 500, body: { message: 'Erreur suppression' } }).as('deleteSession');
    cy.get('.session-item:first .delete-btn').click();
    cy.get('.mat-snack-bar-container').should('exist');
  });

  it('Participates in a session', () => {
    cy.intercept('POST', '/api/session/*/participate', { statusCode: 200 }).as('participate');
    cy.get('.session-item:first .participate-btn').click();
    cy.get('.mat-snack-bar-container').should('exist');
  });

  it('Unparticipates from a session', () => {
    cy.intercept('POST', '/api/session/*/unparticipate', { statusCode: 200 }).as('unparticipate');
    cy.get('.session-item:first .unparticipate-btn').click();
    cy.get('.mat-snack-bar-container').should('exist');
  });
});
