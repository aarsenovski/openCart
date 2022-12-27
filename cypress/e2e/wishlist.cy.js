import product from '../fixtures/product.json'
import { link } from '../pages/link'
import user from '../fixtures/user.json'
import { fillLoginForm } from '../pages/login'
import { productPagelocators } from '../pages/productPage'
import { loginLocators } from '../pages/login'
import { wishListLocators } from '../pages/wishlist'

describe('test wishlist functionality', () => {
  beforeEach(() => {
    cy.intercept('POST', 'index.php?route=account/wishlist/add').as(
      'addToWishlist',
    )
    cy.intercept('GET', 'index.php?route=account/wishlist').as(
      'removeFromWishlist',
    )
  })
  it('should add a product to wishlist', () => {
    cy.visit(`/${link.login}`)
    fillLoginForm(user)
    cy.get(loginLocators.login).click()

    cy.visit(`index.php?route=product/${product.slug}`)
    cy.get(productPagelocators.addToWishlist).click()
    cy.wait('@addToWishlist').then((res) => {
      expect(res.response.body.total).to.contain('Wish List')
      expect(res.response.statusCode).to.eq(200)
    })
  })
  it('should delete a product from wishlist', () => {
    cy.visit(`/${link.login}`)
    fillLoginForm(user)
    cy.get(loginLocators.login).click()

    cy._addProductToWishlist(40)
    cy.visit(link.wishlist)
    cy.get(wishListLocators.removeButton).first().click({ force: true })
    cy.wait('@removeFromWishlist').then((res) => {
      expect(res.response.statusCode).to.eq(200)
    })
  })
})
