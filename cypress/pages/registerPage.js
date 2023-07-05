const locators = {
  firstName: '#input-firstname',
  lastName: '#input-lastname',
  email: '#input-email',
  phone: '#input-telephone',
  password: '#input-password',
  passwordConfirm: '#input-confirm',
  continueButton: "[value ='Continue']",
  policyTickBox: "[name='agree']",
}

const registerFillForm = (user) => {
  cy.get(locators.firstName).type(user.firstName)
  cy.get(locators.lastName).type(user.lastName)
  cy.get(locators.email).type(user.email)
  cy.get(locators.phone).type(user.phone)
  cy.get(locators.password).type(user.password)
  cy.get(locators.passwordConfirm).type(user.passwordConfirm)
}

export const registerPage = {
  locators,
  registerFillForm,
}
