# Web browser automation project for OpenCart website

\*\*Version 1.0.0

This repo consists of example of a suite of test cases regarding various actions a user can perform on the website. It tries to implement several best practices according to Cypress documentation about organizing tests, selecting elements, as well as setting up and controlling state of the application.

Page Object Model (POM) pattern is used to create an object repository for storing all web elements locators per page. Tests included in this repo tend to cover real user scenarios and generally cover 3 phases:

1. Set up the application state.

2. Take an action.

3. Make an assertion about the resulting application state.

Results from the tests can be easily observed using the configured Mochawesome reporter for Cypress.

## :gear: Setup

1. Clone the repo:

   ```
   git clone https://github.com/aarsenovski/openCart
   ```

2. Install project dependencies:
   ```
   npm install
   ```

---

## :bulb: Information

#### :test_tube: Configuration:

:file_folder: Tests are located in `cypress/e2e` folder

:file_folder: Fixtures (test data) are located in `cypress/fixtures` folder

:file_folder: Custom commands are located in `cypress/support` folder

:file_folder: Selectors (Page object patterns) are located in `cypress/pages` folder

:page_facing_up: Main config file where default behavior of Cypress can be modified. -`cypress.config.js` file

#### :test_tube: Run tests:

- run tests in headless mode:

```
npm cypress run
```

- run tests within Cypress Launchpad:

```
npm cypress open
```

- see available options and help:

```
npm cypress --help
```

## Contributor

- Andrej Arsenovski - <andrejarsenovski@gmail.com> - 2023

---

## License and copyright

```

```
