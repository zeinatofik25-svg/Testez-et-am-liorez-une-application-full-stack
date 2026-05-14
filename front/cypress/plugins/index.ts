/**
 * @type {Cypress.PluginConfig}
 */
const registerCodeCoverageTasks = require('@cypress/code-coverage/task');

module.exports = function setupPlugins(on, config) {
  if (config.env?.coverage) {
    return registerCodeCoverageTasks(on, config);
  }

  return config;
};
