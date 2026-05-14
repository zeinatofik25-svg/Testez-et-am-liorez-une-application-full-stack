describe('Me/Logout spec', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/user/1', {
      statusCode: 200,
      body: {
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        email: 'user@yoga.test',
        lastName: 'lastName',
        admin: true,
        createdAt: '2026-05-01T00:00:00.000Z',
        updatedAt: '2026-05-01T00:00:00.000Z'
      }
    }).as('getMe');

    cy.loginByApi();
    cy.contains('span.link', 'Account').click();
    cy.url().should('include', '/me');
    cy.wait('@getMe');
  });

  it('Displays user info', () => {
    cy.contains('h1', 'User information').should('exist');
    cy.contains('p', 'Name:').should('exist');
    cy.contains('p', 'Email:').should('exist');
  });


  it('Back button redirects to sessions', () => {
    cy.get('button[mat-icon-button]').first().click();
    cy.url().should('include', '/sessions');
  });
});
