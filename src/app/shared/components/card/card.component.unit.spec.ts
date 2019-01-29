import { CardComponent } from './card.component';
import { BreakpointObserver } from '@angular/cdk/layout';

describe('CardComponent', () => {
    let component: CardComponent;
    let breakpointObserver: BreakpointObserver;
    beforeEach(() => {
        breakpointObserver = jasmine.createSpyObj('breakpointObserver', ['observe']);
        component = new CardComponent(breakpointObserver);
    });

    it('ngOnInit should initiate call to configure card', () => {
        spyOn(component, 'configureCard');
        component.ngOnInit();
        expect(component.configureCard).toHaveBeenCalled();
    });

    it('configureCard should set title object for the card', () => {
        component.title = 'Test';
        component.configureCard();
        expect(component.objTitle.title).toBe('Test');
    });

    it('should be defined', () => {
        expect(component).toBeDefined();
    });

    it('setHeightClassForDashboardCards should return class min-height when cards are dashboard cards', () => {
        component.title = 'MLA';
        let className = component.setHeightClassForDashboardCards();
        expect(className).toBe('min-height');

        component.title = 'Emissão de Próximas Rendas';
        className = component.setHeightClassForDashboardCards();
        expect(className).toBe('min-height');

        component.title = 'asd';
        className = component.setHeightClassForDashboardCards();
        expect(className).toBe('');
    });

});
