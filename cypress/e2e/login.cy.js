import user from '../fixtures/userRegister.json'
import { loginPage } from '../pages/loginPage'

describe('test login functionality', () => {
  it('should login an existing user', () => {
    loginPage.login(user)
  })

  it('should log out an existing user', () => {
    loginPage.login(user)
    cy.visit('/index.php?route=account/account')

    cy.contains('Logout').click({ force: true })

    cy.url().should('contain', '/index.php?route=account/logout')
  })
})
