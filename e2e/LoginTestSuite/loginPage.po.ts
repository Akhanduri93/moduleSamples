
import { browser, by, element } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { AppPage } from '../app.po';

export class LoginPage {

    baseClass: AppPage;

    constructor(baseClass: AppPage) {
        this.baseClass = baseClass;
    }

    logInTestUserWithWait() {
        element(by.name('email')).sendKeys('acorreia@candor.pt');
        element(by.name('password')).sendKeys('CXIkRIxt');
        this.baseClass.clickOnSubmitButton();
        browser.wait(function () {
            return element(by.className('top-nav')).isPresent();
        }, 10000);
    }

    logInTestUserNoWait(username, password) {
        element(by.name('username')).sendKeys(username);
        element(by.name('password')).sendKeys(password);
        this.baseClass.clickOnSubmitButton();
    }
}
