import userAddress from '../fixtures/userAddress.json'
import userRegister from '../fixtures/userRegister.json'
import { checkoutPage } from '../pages/checkoutPage'
import { linkPage } from '../pages/linkPage'
import { registerPage } from '../pages/registerPage'

describe('test checkout functionality', () => {
  beforeEach(() => {
    cy.intercept('POST', 'index.php?route=checkout/payment_address/save').as(
      'billingDetails',
    )
    cy.intercept('POST', 'index.php?route=checkout/shipping_address/save').as(
      'deliveryDetails',
    )
    cy.intercept('POST', 'index.php?route=checkout/shipping_method/save').as(
      'deliveryMethod',
    )
    cy.intercept('POST', 'index.php?route=checkout/shipping_method/save').as(
      'deliveryMethod',
    )
    cy.intercept('POST', 'index.php?route=checkout/payment_method/save').as(
      'paymentMethod',
    )
    cy.intercept(
      'GET',
      'index.php?route=extension/payment/bank_transfer/confirm',
    ).as('confirmTransfer')
  })

  it.skip('should make a successful order', () => {
    cy.visit(`/${linkPage.locators.register}`)

    cy.fixture('userRegister').then((user) => {
      const newUser = {
        ...userRegister,
        email: `cypress-test${Date.now()}@test.com`,
      }
      registerPage.registerFillForm(newUser)
    })
    cy.get(registerPage.locators.policyTickBox).click()
    cy.contains('Continue').click()

    cy._addProductToCart(1, 40)
    cy.visit(linkPage.locators.cartPage)
    cy.contains('Checkout').click()
    fillCheckoutForm(userRegister)
    cy.get(checkoutPage.locators.country).select(2)
    cy.get(checkoutPage.locators.region).select(2)
    cy.get(checkoutPage.locators.billingDetailsContinue).click()
    cy.wait('@billingDetails').then((res) => {
      expect(res.response.statusCode).to.eq(200)
    })
    cy.get(checkoutPage.locators.deliveryDetailsContinue).click()
    cy.wait('@deliveryDetails').then((res) => {
      expect(res.response.statusCode).to.eq(200)
    })
    cy.get(checkoutPage.locators.commentField).type('this is a comment2')
    cy.get(checkoutPage.locators.deliveryMethodContinue).click()
    cy.wait('@deliveryMethod').then((res) => {
      expect(res.response.statusCode).to.eq(200)
    })
    cy.get(checkoutPage.locators.checkbox).click()
    cy.get(checkoutPage.locators.paymentMehodContinue).click()
    cy.wait('@paymentMethod').then((res) => {
      expect(res.response.statusCode).to.eq(200)
    })
    cy.get(checkoutPage.locators.confirmOrder).click()
    cy.wait('@confirmTransfer').then((res) => {
      expect(res.response.statusCode).to.eq(200)
    })
    cy.get('h1').should('contain', 'Your order has been placed!')
    cy.url().should('contain', 'index.php?route=checkout/success')
  })

  it('should successfully complete - billing details via API', () => {
    cy.visit(`/${linkPage.locators.register}`)

    cy.fixture('userRegister').then((user) => {
      const newUser = {
        ...userRegister,
        email: `cypress-test${Date.now()}@test.com`,
      }
      registerPage.registerFillForm(newUser)
    })
    cy.get(registerPage.locators.policyTickBox).click()
    cy.contains('Continue').click()

    cy._addProductToCart(1, 41).then((res) => {
      console.log(res)
    })
    cy._paymentAddress()
    cy._addBillingDetails(userAddress)
    cy.visit(linkPage.locators.checkoutPage)
    cy.contains('I want to use an existing address')
    cy.get(checkoutPage.locators.billingaddress).should(
      'contain',
      userAddress.address_1,
    )
    cy.get(checkoutPage.locators.billingDetailsContinue).click()
  })
})
