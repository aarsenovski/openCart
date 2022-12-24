Cypress.Commands.add('_addProduct', (quantity, product_id) => {
  cy.request({
    method: 'POST',
    url: 'index.php?route=checkout/cart/add',
    body: {
      quantity: quantity,
      product_id: product_id,
    },
  })
})
