// cypress/e2e/not-found.cy.ts

describe('Not Found spec', () => {
  it('Redirects to 404 page for unknown route', () => {
    cy.visit('/unknown-route', { failOnStatusCode: false });
    cy.url().should('include', '/404');
    cy.contains('h1', 'Page not found !').should('exist');
  });

  it('Redirects to login if not authenticated', () => {
    cy.clearLocalStorage();
    cy.visit('/sessions', { failOnStatusCode: false });
    cy.url().should('include', '/login');
  });

  it('Logout removes token and redirects', () => {
    cy.loginByApi();
    cy.contains('span.link', 'Account').click();
    cy.url().should('include', '/me');
    cy.contains('span.link', 'Logout').click();
    cy.url().should('include', '/login');
    cy.contains('a.link', 'Login').should('exist');
  });
});
