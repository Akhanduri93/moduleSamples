import { AppPage } from '../app.po';
import { by } from 'protractor';
import { ConstractsPage } from './contractsPage.po';

xdescribe('Portal Contracts Page Validation', () => {
    let page: AppPage;
    let contractsPage: ConstractsPage;

    beforeAll(() => {
        page = new AppPage();
        contractsPage = new ConstractsPage(page);
        page.navigateTo();
    });

    describe('Should have all the initial elements', () => {
        it('should have the correct Title', () => {
            expect(page.getWebPageTitle()).toBe('Portal do Cliente Candor');
        });
        it('should have the Candor Logo present', () => {
            expect(page.getCandorLogo().isPresent());
        });
        it('should have the top-nav element', () => {
            expect(page.getTopNavigator().isPresent());
        });
    });
});
