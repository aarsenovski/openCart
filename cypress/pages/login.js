export const loginLocators = {
  email: '#input-email',
  password: '#input-password',
  login: '[value="Login"]',
}

export const fillLoginForm = (user) => {
  cy.get(loginLocators.email).type(user.email)
  cy.get(loginLocators.password).type(user.password)
}
