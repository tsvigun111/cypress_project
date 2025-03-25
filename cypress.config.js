const { lighthouse, prepareAudit } = require('@cypress-audit/lighthouse');
const fs = require('fs');

module.exports = {
  e2e: {
    browser: 'chrome',
    experimentalRunAllSpecs: true,
    specPattern: [
      'cypress/e2e/login-page.cy.js',
      'cypress/e2e/message-broker.cy.js',
      'cypress/e2e/crud.cy.js',
      'cypress/e2e/perfomence.cy.js',
    ],
    chromeWebSecurity: false,
    video: true,
    screenshotOnRunFailure: true,
    videoCompression: true,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports/',
      reportFilename: 'test-report',
      overwrite: false,
      html: false,
      json: true,
      merge: true,
    },

    setupNodeEvents(on, config) {
      // Prepare Lighthouse audit
      on('before:browser:launch', (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });

      on('task', {
        lighthouse: lighthouse(),
      });

      // Clean up videos if no tests failed
      on('after:spec', (spec, results) => {
        if (results && results.video) {
          const failures = results.tests.some(test =>
            test.attempts.some(attempt => attempt.state === 'failed')
          );
          if (!failures) {
            fs.unlinkSync(results.video);
          }
        }
      });
    },
  },
};
