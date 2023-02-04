const { defineConfig } = require('cypress')

module.exports = defineConfig({
  chromeWebSecurity: false,
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
    },

    baseUrl: 'http://opencart.abstracta.us/',
    defaultCommandTimeout: 5000,
  },
})
