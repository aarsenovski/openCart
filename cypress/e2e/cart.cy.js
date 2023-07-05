import product from '../fixtures/product.json'
import { cartPage } from '../pages/cartPage'
import { linkPage } from '../pages/linkPage'
import { mainSitePage } from '../pages/mainSitePage'
import { productDetailPage } from '../pages/productDetailPage'
import { productListPage } from '../pages/productListPage'

describe('test login functionality', () => {
  beforeEach(() => {
    cy.intercept('POST', '**index.php?route=checkout/cart/add').as(
      'addProductToCart',
    )
    cy.intercept('POST', '**index.php?route=checkout/cart/remove').as(
      'removeProductToCart',
    )
  })

  it('should add a product to cart', () => {
    cy.visit('/')
    cy.get(mainSitePage.locators.searchbar).type(
      `${product.productName} {enter}`,
    )

    cy.get(productListPage.locators.productName)
      .should('contain', product.productName)
      .click()
    cy.get(productDetailPage.locators.addToBag).click()

    cy.wait('@addProductToCart').then((res) => {
      expect(res.response.statusCode).to.eq(200).and
      expect(res.response.body.total).to.deep.eq(
        `1 item(s) - $${product.price}0`,
      )
    })
  })

  it('should delete a product from cart', () => {
    cy._addProductToCart(1, 40)
    cy.visit(linkPage.locators.cartPage)

    cy.get(cartPage.locators.removeButton).first().click({ force: true })

    cy.wait('@removeProductToCart').then((res) => {
      expect(res.response.statusCode).to.eq(200).and
      expect(res.response.body.total).to.deep.eq(`0 item(s) - $0.00`)
    })
  })
})
