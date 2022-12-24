import product from '../fixtures/product.json'
import { productListLocators } from '../pages/productListPage'

describe('test login functionality', () => {
  beforeEach(() => {
    cy.intercept('POST', '**index.php?route=checkout/cart/add').as(
      'addProductToCart',
    )
  })
  it.only('should successfully add a product to cart', () => {
    cy.visit('/')

    cy.get('[name="search"]').type(`${product.productName} {enter}`)
    cy.get(productListLocators.productName)
      .should('contain', product.productName)
      .click()

    cy.get('#button-cart').click()
    cy.wait('@addProductToCart').then((res) => {
      console.log(res)
      expect(res.response.statusCode).to.eq(200).and
      expect(res.response.body.total).to.deep.eq(
        `1 item(s) - $${product.price}0`,
      )
    })
  })
  it('should add a product to cart', () => {
    cy.visit('/')
    cy._addProduct(1, 51)
    cy.visit('/index.php?route=checkout/cart')
  })
})
