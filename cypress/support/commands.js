Cypress.Commands.add('_addProductToCart', (quantity, product_id) => {
  return cy.request({
    method: 'POST',
    url: '/index.php?route=checkout/cart/add',
    body: {
      quantity: quantity,
      product_id: product_id,
    },
    form: true,
  })
})

Cypress.Commands.add('_addProductToWishlist', (product_id) => {
  cy.request({
    method: 'POST',
    url: '/index.php?route=account/wishlist/add',
    body: {
      product_id: product_id,
    },
    form: true,
  })
})

Cypress.Commands.add('_addBillingDetails', (userAddress) => {
  cy.request({
    method: 'POST',
    url: '/index.php?route=checkout/payment_address/save',
    body: userAddress,
    form: true,
  })
})

Cypress.Commands.add('_paymentAddress', () => {
  cy.request({
    method: 'GET',
    url: '/index.php?route=checkout/payment_address',
  })
})
