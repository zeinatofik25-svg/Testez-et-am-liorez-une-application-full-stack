// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

declare const Cypress: any;
declare function require(moduleName: string): any;

// When a command from ./commands is ready to use, import with `import './commands'` syntax
import './commands';

if (Cypress.env('coverage')) {
	require('@cypress/code-coverage/support');
}
