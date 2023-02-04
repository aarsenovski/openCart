# Web browser automation project for OpenCart website

\*\*Version 1.0.0

This repo consists of example of a suite of test cases regarding various actions a user can perform on the website. It tries to implement several best practices according to Cypress documentation about organizing tests, selecting elements, as well as setting up and controlling state of the application. Page Object Model (POM) pattern is used which creates an object repository for storing all web elements locators. Tests included in this repo tend to cover real user scenario and generally cover 3 phases:

1. Set up the application state.

2. Take an action.

3. Make an assertion about the resulting application state.

## :gear: Setup

1. 'git clone https://github.com/aarsenovski/openCart'
2. run 'npm install'

---

## :bulb: Information

#### :test_tube: Tests:

:file_folder: Tests are located in `cypress/e2e` folder

:file_folder: Custom commands are located in `cypress/support` folder

:file_folder: Selectors (CSS selectors) are located in `cypress/pages` folder

---

#### :test_tube: Run tests:

run tests in headless mode:

`yarn cypress run`

#### :hammer_and_wrench: Configuration

Config files:

1. `cypress.config.js` - Main config file where default behavior of Cypress can be modified. [More info](https://docs.cypress.io/guides/references/configuration)
2. `plugins/index.js` - Plugins file is where we can programmatically alter the resolved configuration

## Contributor

- Andrej Arsenovski <andrejarsenovski@gmail.com>

---

##License and copyright
