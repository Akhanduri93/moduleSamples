import { AppPage } from './app.po';
import { by } from 'protractor';
import { Elements } from './elements';

describe('Welcome Page Validation', () => {
    let page: AppPage;

    beforeAll(() => {
        page = new AppPage();
        page.navigateTo();
    });

    describe('Should have all the initial elements', () => {
        it('should have the correct Title', () => {
            expect(page.getWebPageTitle()).toBe(Elements.portalName);
        });
        it('should have the Liquido Logo present', () => {
            expect(page.getCandorLogo().isPresent());
        });
        it('should have the right text to create an Account', () => {
            expect(page.getAllLinks(1).getText()).toEqual(Elements.createAccountText);
        });
        it('should display welcome message', () => {
            expect(page.getParagraphText()).toEqual(Elements.enterToLiquidWebSiteText);
        });
        it('should have the username inputbox', () => {
            expect(page.getUsernameInputBox().isPresent());
        });
        it('should have the password inputbox', () => {
            expect(page.getPasswordInputBox().isPresent());
        });
        it('should have the ENTRAR button', () => {
            const submitButton = page.getSubmitButton();
            expect(submitButton.isPresent());
            expect(submitButton.getText().then(function(texto) {
                    return texto.toUpperCase();
            } )).toMatch(Elements.confirmButton);
        });
        it('should have the link for forgot password', () => {
            expect(page.getAllLinks(2).getText()).toEqual(Elements.forgotPasswordText);
        });
        it('should have a checkbox to remember user credentials', () => {
            expect(page.getCheckbox().getText()).toEqual(Elements.checkboxText);
        });

        it('should have the footer ', () => {
            const footer = page.getFooter();
            expect(footer.isPresent());
            expect(footer.getText()).toContain(Elements.footerText);
        });
    });
});
