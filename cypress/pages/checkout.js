export const checkoutLocators = {
  firstName: '[name="firstname"]',
  lastName: '[name="lastname"]',
  company: '[name="company"]',
  address: '[name="address_1"]',
  city: '[name="city"]',
  country: '[name="country_id"]',
  region: '[name="zone_id"]',
  billingDetailsContinue: '[id="button-payment-address"]',
  deliveryDetailsContinue: '[id="button-shipping-address"]',
  commentField: '[name="comment"]',
  deliveryMethodContinue: '[id="button-shipping-method"]',
  paymentMehodContinue: '[id="button-payment-method"]',
  checkbox: '[name="agree"]',
  confirmOrder: '[id="button-confirm"]',
  billingaddress: '[name="address_id"]',
}

export const fillCheckoutForm = (user) => {
  cy.get(checkoutLocators.firstName).type(user.firstName)
  cy.get(checkoutLocators.lastName).type(user.lastName)
  cy.get(checkoutLocators.company).type(user.company)
  cy.get(checkoutLocators.address).type(user.address)
  cy.get(checkoutLocators.city).type(user.city)
}
