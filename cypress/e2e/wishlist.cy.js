import product from '../fixtures/product.json'
import { link } from '../pages/link'
import user from '../fixtures/user.json'
import { fillLoginForm } from '../pages/login'
import { productPagelocators } from '../pages/productPage'
import { loginLocators } from '../pages/login'

describe('test wishlist functionality', () => {
  beforeEach(() => {
    cy.intercept('POST', 'index.php?route=account/wishlist/add').as(
      'addToWishlist',
    )
  })
  it('should add a product to wishlist', () => {
    cy.visit(`/${link.login}`)
    fillLoginForm(user)
    cy.get(loginLocators.login).click()
    cy.url().should('contain', 'account/account')

    cy.visit(`index.php?route=product/${product.slug}`)
    cy.get(productPagelocators.addToWishlist).click()
    cy.wait('@addToWishlist').then((res) => {
      expect(res.response.body.total).to.eq('Wish List (1)')
      expect(res.response.statusCode).to.eq(200)
    })
  })
})
