// cypress/e2e/register.cy.ts

describe('Register spec', () => {
  it('Register successfully', () => {
    cy.visit('/register');
    cy.intercept('POST', '/api/auth/register', {
      body: {
        id: 2,
        username: 'newUser',
        firstName: 'Jane',
        lastName: 'Doe',
        admin: false
      },
    }).as('register');
    cy.get('input[formControlName=email]').type('new@user.com');
    cy.get('input[formControlName=password]').type('test!1234');
    cy.get('input[formControlName=firstName]').type('Jane');
    cy.get('input[formControlName=lastName]').type('Doe');
    cy.get('button[type=submit]').click();
    cy.url().should('include', '/login');
  });

  it('Register fails with existing email', () => {
    cy.visit('/register');
    cy.intercept('POST', '/api/auth/register', { statusCode: 400, body: { message: 'Email is already taken!' } }).as('register');
    cy.get('input[formControlName=email]').type('existing@user.com');
    cy.get('input[formControlName=password]').type('test!1234');
    cy.get('input[formControlName=firstName]').type('Jane');
    cy.get('input[formControlName=lastName]').type('Doe');
    cy.get('button[type=submit]').click();
    cy.contains('Email is already taken!').should('exist');
    cy.url().should('include', '/register');
  });

  it('Register fails with empty fields', () => {
    cy.visit('/register');
    cy.get('button[type=submit]').click();
    cy.get('input[formControlName=email]:invalid').should('exist');
    cy.get('input[formControlName=password]:invalid').should('exist');
    cy.get('input[formControlName=firstName]:invalid').should('exist');
    cy.get('input[formControlName=lastName]:invalid').should('exist');
    cy.url().should('include', '/register');
  });
});
