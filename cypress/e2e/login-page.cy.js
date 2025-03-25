import { loginPage } from '../constants/pages';

describe(`Login Page Test`, () => {
  beforeEach(() => {
    loginPage.visit();
  })

  it('Verify User Login with valid data', () => {
    loginPage.enterUserName('standard_user');
    loginPage.enterPassword('secret_sauce');
    loginPage.clickLoginButton();
    cy.location('pathname').should('eq', '/inventory.html');
  });

  it(`Verify User Can't Login with invalid data`, () => {
    loginPage.enterUserName('cypress-test');
    loginPage.enterPassword('secret_sauce');
    loginPage.clickLoginButton();
    loginPage.errorMessage();
  });
});
