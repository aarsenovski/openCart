import { linkPage } from '../pages/linkPage'
import { registerPage } from '../pages/registerPage'

describe('test register functionality', () => {
  it('should register a new user', () => {
    cy.visit(`/${linkPage.locators.register}`)
    cy.fixture('userRegister').then((user) => {
      const newUser = {
        ...user,
        email: `cypress-test${Date.now()}@test.com`,
      }

      registerPage.registerFillForm(newUser)
    })
    cy.get(registerPage.locators.policyTickBox).click()

    cy.contains('Continue').click()
    cy.url().should('contain', '/success')
  })
})
