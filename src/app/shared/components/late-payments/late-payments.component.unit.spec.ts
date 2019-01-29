import { LatePaymentsComponent } from './late-payments.component';
import { PaymentInformationServiceMock } from '../../../core/mocks/payment-information.service.mock';
import { tick, fakeAsync } from '@angular/core/testing';
import { throwError } from 'rxjs';
import { LoadingServiceMock } from '../../../core/mocks/loading.service.mock';

describe('LatePaymentsComponent Unit', () => {
  let component: LatePaymentsComponent;
  let service;
  let breakpointObserver;
  let snackBar;
  let loadingService;
  beforeEach(() => {
    service = new PaymentInformationServiceMock();
    breakpointObserver = jasmine.createSpyObj('breakpointObserver', ['observe']);
    snackBar = jasmine.createSpyObj('snackBar', ['openFromComponent']);
    loadingService = new LoadingServiceMock();
    component = new LatePaymentsComponent(service, breakpointObserver, loadingService, snackBar);
  });

  it('should create a component  ', () => {
    expect(component).toBeTruthy();
  });

  it('should call getLatePayment on ngOnInit', () => {
    spyOn(component, 'getLatePayment');
    component.ngOnInit();
    expect(component.getLatePayment).toHaveBeenCalled();
  });

  it('when getLatePayment is called successfully and the data is fetched isLoading should be false, ' +
    'mbReferenceMap to be defined and invoices should not be empty and mbReferenceMap should have same length as invoices' +
      ' and hasLatePayment should be true',
    fakeAsync(() => {
      component.getLatePayment();
      tick();
      expect(component.mbReferenceMap).toBeDefined();
      expect(component.invoices).not.toBe([]);
      expect(component.hasLatePayment).toEqual(true);
      expect(component.isLoading).toBeFalsy();
      expect(component.mbReferenceMap.size).toEqual(component.invoices.length);
    }));

  it('when getLatePayment is called with error isLoading should be false, ' +
      'invoices should be empty and mbReferenceMap should be empty and hasLatePayment should be false', () => {
    spyOn(service, 'getLatePayment').and.returnValue(throwError('Error: Failed to fetch late_payment!'));
    component.getLatePayment();
    expect(component.isLoading).toBeFalsy();
    expect(component.invoices).toEqual([]);
    expect(component.hasLatePayment).toEqual(false);
    expect(component.mbReferenceMap).toEqual(new Map<number, boolean>());
  });

  it('when getLatePayment is called isLoading should be true ', () => {
    spyOn(component, 'setLoading');
    component.setLoading();
    expect(component.setLoading).toHaveBeenCalled();
  });
});
