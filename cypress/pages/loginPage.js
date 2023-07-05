import { linkPage } from './linkPage'

const locators = {
  email: '#input-email',
  password: '#input-password',
  login: '[value="Login"]',
}

const login = (user) => {
  cy.session(
    [user.firstName, user.password],
    () => {
      cy.visit(`/${linkPage.locators.login}`)

      cy.get(locators.email).type(user.email)
      cy.get(locators.password).type(user.password)
      cy.get(locators.login).click()

      cy.url().should('contain', '/index.php?route=account/account')
    },
    {
      validate() {
        cy.getCookie('OCSESSID').should('exist')
      },
    },
  )
}
export const loginPage = {
  locators,
  login,
}
