// cypress/e2e/me.cy.ts

describe('Me/Logout spec', () => {
  beforeEach(() => {
    cy.loginByApi(); // Custom command to set token/localStorage if available
    cy.visit('/me');
  });

  it('Displays user info', () => {
    cy.get('.user-info').should('exist');
    cy.get('.user-info').should('contain', 'firstName');
  });

  it('Logout redirects to login', () => {
    cy.get('button[aria-label=logout]').click();
    cy.url().should('include', '/login');
  });
});
