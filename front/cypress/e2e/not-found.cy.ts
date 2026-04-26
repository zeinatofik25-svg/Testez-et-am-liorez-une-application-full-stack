// cypress/e2e/not-found.cy.ts

describe('Not Found spec', () => {
  it('Redirects to 404 page for unknown route', () => {
    cy.visit('/unknown-route', { failOnStatusCode: false });
    cy.get('.not-found').should('exist');
    cy.get('.not-found').should('contain', '404');
  });

  it('Redirects to login if not authenticated', () => {
    cy.clearLocalStorage();
    cy.visit('/sessions', { failOnStatusCode: false });
    cy.url().should('include', '/login');
  });

  it('Logout removes token and redirects', () => {
    cy.loginByApi();
    cy.visit('/me');
    cy.get('button[aria-label=logout]').click();
    cy.url().should('include', '/login');
    cy.window().then(win => {
      expect(win.localStorage.getItem('token')).to.be.null;
    });
  });
});
