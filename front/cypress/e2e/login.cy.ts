describe('Login spec', () => {
  it('Login successfull', () => {
    cy.visit('/login');
    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: true
      },
    }).as('login');
    cy.intercept({ method: 'GET', url: '/api/session' }, []).as('session');
    cy.get('input[formControlName=email]').type('yoga@studio.com');
    cy.get('input[formControlName=password]').type('test!1234');
    cy.get('button[type=submit]').click();
    cy.wait('@login');
    cy.url().should('include', '/sessions');
  });

  it('Login fails with wrong password', () => {
    cy.visit('/login');
    cy.intercept('POST', '/api/auth/login', { statusCode: 401, body: { message: 'Invalid credentials' } }).as('login');
    cy.get('input[formControlName=email]').type('yoga@studio.com');
    cy.get('input[formControlName=password]').type('wrongpass');
    cy.get('button[type=submit]').click();
    cy.wait('@login');
    cy.contains('An error occurred').should('exist');
    cy.url().should('include', '/login');
  });

  it('Login fails with empty fields', () => {
    cy.visit('/login');
    cy.get('button[type=submit]').should('be.disabled');
    cy.get('input[formControlName=email]:invalid').should('exist');
    cy.get('input[formControlName=password]:invalid').should('exist');
    cy.url().should('include', '/login');
  });
});