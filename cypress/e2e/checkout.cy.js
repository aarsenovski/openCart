import { link } from '../pages/link'
import { fillLoginForm } from '../pages/login'
import userRegister from '../fixtures/userRegister.json'
import { loginLocators } from '../pages/login'
import { checkoutLocators } from '../pages/checkout'
import { fillCheckoutForm } from '../pages/checkout'
import { registerFillForm } from '../pages/register'
import { registerPageLocators } from '../pages/register'
import userAddress from '../fixtures/userAddress.json'

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

  it('should make a successful order', () => {
    cy.visit(`/${link.register}`)

    cy.fixture('userRegister').then((user) => {
      const newUser = {
        ...userRegister,
        email: `cypress-test${Date.now()}@test.com`,
      }
      registerFillForm(newUser)
    })
    cy.get(registerPageLocators.policyTickBox).click()
    cy.contains('Continue').click()

    cy._addProductToCart(1, 40)
    cy.visit(link.cartPage)
    cy.contains('Checkout').click()
    fillCheckoutForm(userRegister)
    cy.get(checkoutLocators.country).select(2)
    cy.get(checkoutLocators.region).select(2)
    cy.get(checkoutLocators.billingDetailsContinue).click()
    cy.wait('@billingDetails').then((res) => {
      expect(res.response.statusCode).to.eq(200)
    })
    cy.get(checkoutLocators.deliveryDetailsContinue).click()
    cy.wait('@deliveryDetails').then((res) => {
      expect(res.response.statusCode).to.eq(200)
    })
    cy.get(checkoutLocators.commentField).type('this is a comment2')
    cy.get(checkoutLocators.deliveryMethodContinue).click()
    cy.wait('@deliveryMethod').then((res) => {
      expect(res.response.statusCode).to.eq(200)
    })
    cy.get(checkoutLocators.checkbox).click()
    cy.get(checkoutLocators.paymentMehodContinue).click()
    cy.wait('@paymentMethod').then((res) => {
      expect(res.response.statusCode).to.eq(200)
    })
    cy.get(checkoutLocators.confirmOrder).click()
    cy.wait('@confirmTransfer').then((res) => {
      expect(res.response.statusCode).to.eq(200)
    })
    cy.get('h1').should('contain', 'Your order has been placed!')
    cy.url().should('contain', 'index.php?route=checkout/success')
  })

  it('should successfully complete - billing details via API', () => {
    cy.visit(`/${link.register}`)

    cy.fixture('userRegister').then((user) => {
      const newUser = {
        ...userRegister,
        email: `cypress-test${Date.now()}@test.com`,
      }
      registerFillForm(newUser)
    })
    cy.get(registerPageLocators.policyTickBox).click()
    cy.contains('Continue').click()

    cy._addProductToCart(1, 41).then((res) => {
      console.log(res)
    })
    cy._paymentAddress()
    cy._addBillingDetails(userAddress)
    cy.visit(link.checkoutPage)
    cy.contains('I want to use an existing address')
    cy.get(checkoutLocators.billingaddress).should(
      'contain',
      userAddress.address_1,
    )
    //cy.get(checkoutLocators.billingDetailsContinue).click()
  })

  it('should successfully complete - delivery method and details via API', () => {
    cy.visit(`/${link.register}`)

    cy.fixture('userRegister').then((user) => {
      const newUser = {
        ...userRegister,
        email: `cypress-test${Date.now()}@test.com`,
      }
      registerFillForm(newUser)
    })
    cy.get(registerPageLocators.policyTickBox).click()
    cy.contains('Continue').click()

    cy._addProductToCart(1, 41).then((res) => {
      console.log(res)
    })
    cy._paymentAddress()
    cy._addBillingDetails(userAddress)
    cy.visit(link.checkoutPage)
    cy.get(checkoutLocators.billingDetailsContinue).click()
    cy._addDeliveryDetails()
    cy.get(checkoutLocators.billingDetailsContinue).click()
  })
})
