import {PaymentInformationComponent} from './payment-information.component';
import {FinancialServiceMock} from '../../../../core/mocks/financial-status.service.mock';
import {of, throwError} from 'rxjs';
import {LoadingServiceMock} from '../../../../core/mocks/loading.service.mock';
import {BreakpointObserver} from '@angular/cdk/layout';

describe('PaymentInformationComponent Unit', () => {
    let component: PaymentInformationComponent;
    let service;
    let loadingService;
    let breakpointObserver: BreakpointObserver;

    beforeEach(() => {
        service = new FinancialServiceMock();
        loadingService = new LoadingServiceMock();
        breakpointObserver = jasmine.createSpyObj('breakpointObserver', ['observe']);
        component = new PaymentInformationComponent(service, loadingService, breakpointObserver);
    });

  it('should create a component  ', () => {
    expect(component).toBeTruthy();
  });

  it('getNextInvoices should initiate call to pull next invoices and ' +
    'should set component varaible with the pulled invoices', () => {
      spyOn(service, 'getNextInvoices').and.callThrough();
      component.setSubCards();
      component.getNextInvoices();
      expect(component.upcomingInvoices.length).toBeGreaterThan(0);
    });

  it('getNextInvoices should set component upcomingInvoices to empty array when fetched invoices are empty', () => {
    spyOn(service, 'getNextInvoices').and.returnValue(of([]));
    component.setSubCards();
    component.getNextInvoices();
    expect(component.upcomingInvoices.length).toBe(0);
    expect(component.existsNextInvoices()).toBeFalsy();
  });

  it('getNextInvoices if failed due to some exception should set upcomingInvoices to empty', () => {
    spyOn(service, 'getNextInvoices').and.returnValue(throwError('Error: Failed to fetch next invoices!'));
    component.setSubCards();
    component.getNextInvoices();
    expect(component.upcomingInvoices.length).toBe(0);
  });

  it('when calling isNextInvoicePage() should return true if the active page is the invoices card', () => {
    component.ngOnInit();
    expect(component.isNextInvoicesPage()).toBeTruthy();
  });

});
