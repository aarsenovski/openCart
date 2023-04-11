import user from '../fixtures/userRegister.json'
import { link } from './link'

export const loginLocators = {
  email: '#input-email',
  password: '#input-password',
  login: '[value="Login"]',
}

export const login = (user) => {
  cy.session(
    [user.firstName, user.password],
    () => {
      cy.visit(`/${link.login}`)

      cy.get(loginLocators.email).type(user.email)
      cy.get(loginLocators.password).type(user.password)
      cy.get(loginLocators.login).click()

      cy.url().should('contain', '/index.php?route=account/account')
    },
    {
      validate() {
        cy.getCookie('OCSESSID').should('exist')
      },
    },
  )
}
const loginPage = {
  loginLocators,
  login,
}

export default loginPage
