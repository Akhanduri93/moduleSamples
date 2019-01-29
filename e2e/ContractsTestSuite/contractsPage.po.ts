import { browser, by, element } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { AppPage } from '../app.po';

export class ConstractsPage {

    baseClass: AppPage;

    constructor(baseClass: AppPage) {
        this.baseClass = baseClass;
    }
}
