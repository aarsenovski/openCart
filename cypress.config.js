const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
require('dotenv').config()

module.exports = defineConfig({
  chromeWebSecurity: false,
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    video: false,
    setupNodeEvents(on, config) {
      on('file:preprocessor', createBundler())
      require('cypress-mochawesome-reporter/plugin')(on)

      config.baseUrl = process.env.CYPRESS_BASE_URL
      return config
    },
    defaultCommandTimeout: 4000,
  },
})
