import { link } from '../pages/link' //named export
import { fillLoginForm, loginLocators } from '../pages/login'
import user from '../fixtures/user.json'

describe('test login functionality', () => {
  it('should login an existing user', () => {
    cy.visit(`/${link.login}`)

    fillLoginForm(user)

    cy.get(loginLocators.login).click()
    cy.url().should('contain', 'account/account')
  })
})
