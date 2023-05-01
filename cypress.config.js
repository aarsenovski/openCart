const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')

module.exports = defineConfig({
  chromeWebSecurity: false,
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    video: false,
    setupNodeEvents(on, config) {
      on('file:preprocessor', createBundler())
      require('cypress-mochawesome-reporter/plugin')(on)
    },

    baseUrl: 'http://opencart.abstracta.us/',
    defaultCommandTimeout: 5000,
  },
})
