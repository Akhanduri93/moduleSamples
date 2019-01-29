import { AppComponent } from './app.component';
import { DetectBrowserService } from '../../services/detect-browser.service';


describe('AppComponent', () => {
    let component: AppComponent;
    let dService: DetectBrowserService;
    let router;
    beforeEach(() => {
        dService = new DetectBrowserService();
        router = jasmine.createSpyObj('router', ['navigate', 'navigateByUrl']);
        component = new AppComponent(dService, router);
    });

    it('should create a component', () => {
        expect(component).toBeTruthy();
    });

    it('ngOnInit should initiate a call to check browser', () => {
        spyOn(dService, 'isIE').and.callThrough();
        component.ngOnInit();
        expect(dService.isIE).toHaveBeenCalled();
    });

    it('detectBrowserService when detects IE, it should initiate a call to router for navigation to IE no support URL', () => {
        spyOn(dService, 'isIE').and.returnValue(12);
        component.ngOnInit();
        expect(dService.isIE).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/no-ie-support']);
    });

    it('detectBrowserService when does not detects IE, it should not initiate a call to router for navigation to IE no support URL', () => {
        spyOn(dService, 'isIE').and.returnValue(false);
        component.ngOnInit();
        expect(dService.isIE).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledTimes(0);
    });

});
