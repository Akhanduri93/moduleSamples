import { FinancialStatusComponent } from './financial-status.component';
import { AccountServiceMock } from '../../../../core/mocks/account.service.mock';
import { tick, fakeAsync } from '@angular/core/testing';
import { throwError } from 'rxjs';
import { LoadingServiceMock } from '../../../../core/mocks/loading.service.mock';
import { StorageMock } from '../../../../core/mocks/storage.mock';

describe('FinancialStatusComponent', () => {
  let component: FinancialStatusComponent;
  let accountService;
  let loadingService;
  const storageMock = new StorageMock();

  beforeEach(() => {
    accountService = new AccountServiceMock();
    loadingService = new LoadingServiceMock();
    component = new FinancialStatusComponent(accountService, loadingService);
    storageMock.setLocalStorage();
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCurrentAccount on ngOnInit', () => {
    spyOn(component, 'getCurrentAccount');
    component.ngOnInit();
    expect(component.getCurrentAccount).toHaveBeenCalled();
  });

  it('should call getCurrentAccount service on getCurrentAccount', fakeAsync(() => {
    const spyAccount = spyOn(accountService, 'getCurrentAccount').and.callThrough();
    component.getCurrentAccount();
    tick();
    expect(spyAccount).toHaveBeenCalled();
  }));

  it('should increment loading after calling getCurrentAccount service', fakeAsync(() => {
    const spyLoading = spyOn(loadingService, 'increment').and.callThrough();
    component.getCurrentAccount();
    tick();
    expect(spyLoading).toHaveBeenCalled();
  }));

  it('should save account after calling getCurrentAccount service', fakeAsync(() => {
    component.getCurrentAccount();
    tick();
    expect(component.account).toBeDefined();
  }));

  it('should change the used percent after calling getCurrentAccount service', fakeAsync(() => {
    component.getCurrentAccount();
    tick();
    const newUsedPercent = component.account.usedCredit / (component.account.usedCredit + component.account.availableCredit);
    expect(component.usedPercent).toBeGreaterThanOrEqual(newUsedPercent);
  }));

  it('should fail calling getCurrentAccount service', fakeAsync(() => {
    const spyAccount = spyOn(accountService, 'getCurrentAccount').and.returnValue(throwError('Error'));
    const spyLoading = spyOn(loadingService, 'increment').and.callThrough();
    component.getCurrentAccount();
    expect(spyAccount).toHaveBeenCalled();
    expect(spyLoading).toHaveBeenCalled();
    expect(component.account).toBeNull();
  }));

  it('should clean account when ngOnDestroy', () => {
    component.ngOnDestroy();
    expect(component.account).toBeNull();
  });
});
