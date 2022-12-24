import { registerPageLocators, registerFillForm } from '../pages/register'
// const user = require("../fixtures/user.json");
//import { user } from "../fixtures/user"; - this is when it's js
import { link } from '../pages/link'

describe('test register functionality', () => {
  it('should register a new user', () => {
    cy.visit(`/${link.register}`)

    cy.fixture('user').then((user) => {
      const newUser = {
        ...user,
        email: `cypress-test${Date.now()}@test.com`,
      }
      registerFillForm(newUser)
    })
    cy.get(registerPageLocators.policyTickBox).click()

    cy.contains('Continue').click()
    cy.url().should('contain', '/success')
  })
})
