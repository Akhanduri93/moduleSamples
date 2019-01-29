import { AppPage } from '../app.po';
import { by, browser } from 'protractor';
import { LoginPage } from './loginPage.po';

describe('Login Use Case', () => {

    let page: AppPage;
    let loginPage: LoginPage;

    beforeAll(() => {
        page = new AppPage();
        loginPage = new LoginPage(page);
        page.refresh();
    });

    beforeEach(function() {
        page.refresh();
    });

    it('should not log in and instead trigger error messages, since the fields are empty.', () => {
        page.clickOnSubmitButton();
        expect(page.getErrorMessage().isPresent());
        expect(browser.getCurrentUrl()).toContain('login');
    });
    it('should not log in and instead trigger error message, since the login is invalid.', () => {
        loginPage.logInTestUserNoWait('asantos@candor.pt', 'abcdef');
        expect(page.getAlertErrorMessage().isPresent());
        expect(browser.getCurrentUrl()).toContain('login');
    });
    it('should log in successfully with valid user.', () => {
        loginPage.logInTestUserWithWait();
        expect(browser.getCurrentUrl()).toMatch('/portal/dashboard/contracts');
    });
});
