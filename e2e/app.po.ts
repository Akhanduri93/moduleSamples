import { browser, by, element } from 'protractor';
import { protractor } from 'protractor/built/ptor';
// const inspector = require('inspector'); This line here is an example to activate the debbuger.

export class AppPage {

  static readonly configFile = './runnerConfig.json';

  readConfigFile() {
    const jsonParsed = require(AppPage.configFile);
    return jsonParsed;
  }

  navigateTo() {
    //now working only for login, remove this!!!TODO
    let url = '/login';
    const configFile = this.readConfigFile();
    if ( ! configFile.runningLocal) {
      url = configFile.URL;
    }
    browser.get(url);
    browser.waitForAngular();
  }

  close() {
    browser.close();
  }

  refresh() {
    browser.refresh();
    browser.waitForAngular();
  }

  getWebPageTitle() {
    return browser.getTitle();
  }

  getCandorLogInButton() {
    return element(by.id('btn-simulacao-top-nav'));
  }

  clickOnCandorLogInButton() {
    this.getCandorLogInButton().click();
    browser.wait(function () {
      return element(by.className('candor-logo')).isPresent();
    });
  }

  getParagraphText() {
    return element(by.css('h1')).getText();
  }
  getCandorLogo() {
    return element(by.className('logo'));
  }
  getUsernameInputBox() {
    return element(by.css('mat-form-field'));
  }

  setUsernameInputBox(user) {
    element(by.name('username')).sendKeys(user);
  }

  getPasswordInputBox() {
    return element(by.name('password'));
  }

  getSubmitButton() {
    return element(by.tagName('button'));
  }

  getForgotPassword() {
    return element(by.className('a'));
  }

  getFooter() {
    return element(by.className('footer'));
  }

  clickOnSubmitButton() {
    element(by.tagName('button')).click();
  }

  getCheckbox() {
    return element(by.tagName('mat-checkbox'));
  }

  getAllLinks(index: number) {
    return element.all(by.tagName('a')).get(index);
  }

}
