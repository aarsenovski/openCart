import product from '../fixtures/product.json'
import { productListLocators } from '../pages/productListPage'
import { link } from '../pages/link'
import { cartLocators } from '../pages/cart'
describe('test login functionality', () => {
  beforeEach(() => {
    cy.intercept('POST', '**index.php?route=checkout/cart/add').as(
      'addProductToCart',
    )
  })
  it('should add a product to cart', () => {
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
  it('should delete a product from cart', () => {
    cy._addProductToCart(1, 40)
    cy.visit(link.cartPage)
    cy.get(cartLocators.removeButton).first().click({ force: true })
  })
})
