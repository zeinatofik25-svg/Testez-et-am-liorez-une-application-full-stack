describe('Login spec', () => {
  it('Login successfull', () => {
    cy.visit('/login')
    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: true
      },
    })
    cy.intercept({ method: 'GET', url: '/api/session' }, []).as('session')
    cy.get('input[formControlName=email]').type('yoga@studio.com')
    cy.get('input[formControlName=password]').type('test!1234{enter}')
    cy.url().should('include', '/sessions')
  })

  it('Login fails with wrong password', () => {
    cy.visit('/login')
    cy.intercept('POST', '/api/auth/login', { statusCode: 401, body: { message: 'Invalid credentials' } })
    cy.get('input[formControlName=email]').type('yoga@studio.com')
    cy.get('input[formControlName=password]').type('wrongpass{enter}')
    cy.contains('Invalid credentials').should('exist')
    cy.url().should('include', '/login')
  })

  it('Login fails with empty fields', () => {
    cy.visit('/login')
    cy.get('button[type=submit]').click()
    cy.get('input[formControlName=email]:invalid').should('exist')
    cy.get('input[formControlName=password]:invalid').should('exist')
    cy.url().should('include', '/login')
  })
});