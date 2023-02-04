export const registerPageLocators = {
  firstName: "#input-firstname",
  lastName: "#input-lastname",
  email: "#input-email",
  phone: "#input-telephone",
  password: "#input-password",
  passwordConfirm: "#input-confirm",
  continueButton: "[value ='Continue']",
  policyTickBox: "[name='agree']",
};

export const registerFillForm = (user) => {
  cy.get(registerPageLocators.firstName).type(user.firstName);
  cy.get(registerPageLocators.lastName).type(user.lastName);
  cy.get(registerPageLocators.email).type(user.email);
  cy.get(registerPageLocators.phone).type(user.phone);
  cy.get(registerPageLocators.password).type(user.password);
  cy.get(registerPageLocators.passwordConfirm).type(user.passwordConfirm);
};
