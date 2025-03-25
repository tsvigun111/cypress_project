import { errorMessages } from "../cypress/constants/error-messages";
import { loginPageSelectors, urls } from "../cypress/constants/selectors.js";

class LoginPage {
  visit() {
    cy.visit(urls.baseUrl);
  }

  loginContainer() {
    return cy.get(loginPageSelectors.loginContainer);
  }

  enterUserName(userName) {
    this.loginContainer().find(loginPageSelectors.usernameInput).type(userName);
  }

  enterPassword(password) {
    this.loginContainer().find(loginPageSelectors.passwordInput).type(password);
  }

  clickLoginButton() {
    this.loginContainer().find(loginPageSelectors.loginButton)
      .should('be.visible')
      .click();
  }

  errorMessage() {
    this.loginContainer().find('h3[data-test="error"]')
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        expect(text).eq(errorMessages.loginError);
      });
  }

  assertLoginPage() {
    this.loginContainer().should('be.visible');
  }
}

export default LoginPage;
