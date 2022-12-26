Cypress.Commands.add('_addProductToCart', (quantity, product_id) => {
  //way to send form-data due to API specs
  const formData = new FormData()
  formData.set('quantity', quantity)
  formData.set('product_id', product_id)
  cy.request({
    method: 'POST',
    url: '/index.php?route=checkout/cart/add',
    body: formData,
  }).then((response) => {
    // When user-passed body to the Nodejs server is a Buffer,
    // Nodejs doesn't provide any decoder in the response.
    // So, we need to decode it ourselves.
    const dec = new TextDecoder()
    const result = dec.decode(response.body)
  })
})

Cypress.Commands.add('_addProductToWishlist', (product_id) => {
  //way to send form-data due to API specs
  const formData = new FormData()
  formData.set('product_id', product_id)
  cy.request({
    method: 'POST',
    url: '/index.php?route=account/wishlist/add',
    body: formData,
  }).then((response) => {
    // When user-passed body to the Nodejs server is a Buffer,
    // Nodejs doesn't provide any decoder in the response.
    // So, we need to decode it ourselves.
    const dec = new TextDecoder()
    const result = dec.decode(response.body)
  })
})
