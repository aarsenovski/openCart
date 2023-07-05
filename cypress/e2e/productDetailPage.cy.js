import product from '../fixtures/product.json'
import user from '../fixtures/userRegister.json'
import { linkPage } from '../pages/linkPage'
import { loginPage } from '../pages/loginPage'
import { productPage } from '../pages/productPage'
import { wishListPage } from '../pages/wishlistPage'

describe('test productDetailPage functionality', () => {
  beforeEach(() => {
    cy.intercept('POST', 'index.php?route=account/wishlist/add').as(
      'addToWishlist',
    )
    cy.intercept('GET', 'index.php?route=account/wishlist').as(
      'removeFromWishlist',
    )
  })
  it('should add a product to wishlist', () => {
    loginPage.login(user)

    cy.visit(`index.php?route=product/${product.slug}`)
    cy.get(productPage.locators.addToWishlist).click()
    cy.wait('@addToWishlist').then((res) => {
      expect(res.response.body.total).to.contain('Wish List')
      expect(res.response.statusCode).to.eq(200)
    })
  })
  it('should delete a product from wishlist', () => {
    loginPage.login(user)

    cy._addProductToWishlist(40)
    cy.visit(linkPage.locators.wishlist)
    cy.get(wishListPage.locators.removeButton).first().click({ force: true })
    cy.wait('@removeFromWishlist').then((res) => {
      expect(res.response.statusCode).to.eq(200)
    })
  })
})
