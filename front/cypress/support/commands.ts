// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

interface LoginOverride {
	id?: number;
	username?: string;
	firstName?: string;
	lastName?: string;
	admin?: boolean;
}

// Logs in through the actual UI flow with mocked backend responses.
Cypress.Commands.add('loginByApi', (override: LoginOverride = {}) => {
	const user = {
		token: 'fake-jwt-token',
		type: 'Bearer',
		id: 1,
		username: 'userName',
		firstName: 'firstName',
		lastName: 'lastName',
		admin: true,
		...override,
	};

	cy.intercept({ method: 'POST', url: '/api/auth/login', times: 1 }, { statusCode: 200, body: user }).as('loginByApi');
	cy.intercept({ method: 'GET', url: '/api/session', times: 1 }, { statusCode: 200, body: [] }).as('loginByApiSessions');

	cy.visit('/login');
	cy.get('input[formControlName=email]').type('user@yoga.test');
	cy.get('input[formControlName=password]').type('test!1234');
	cy.get('button[type=submit]').click();
	cy.wait('@loginByApi');
	cy.wait('@loginByApiSessions');
	cy.url().should('include', '/sessions');
});

declare global {
	namespace Cypress {
		interface Chainable {
			loginByApi(override?: LoginOverride): Chainable<void>;
		}
	}
}
