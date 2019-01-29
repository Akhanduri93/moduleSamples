import { ContractsTableComponent } from './contracts-table.component';
import { ContractServiceMock } from '../../../../core/mocks/contract.service.mock';
import { tick, fakeAsync } from '@angular/core/testing';
import {  Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { LoadingService } from '../../../../core/services/loading.service';
import { MatSnackBar } from '@angular/material';

describe('ContractsTableComponent', () => {
  let component: ContractsTableComponent;
  let service;
  let loadingService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    service = new ContractServiceMock();
    loadingService = new LoadingService();
    snackBar = jasmine.createSpyObj('snackBar', ['openFromComponent']);
    component = new ContractsTableComponent(service, loadingService, snackBar);
  });

  it('should create a component  ', () => {
    expect(component).toBeTruthy();
  });

  it('should call getContracts on ngOnInit', () => {
    spyOn(component, 'getContracts');
    component.ngOnInit();
    expect(component.getContracts).toHaveBeenCalled();
  });

  it('when getContracts is called with error isLoading should be false, contracts should be empty', fakeAsync(() => {
    spyOn(service, 'getContracts').and.returnValue(throwError(new Error('Error: Failed to fetch contracts!')));
    component.getContracts();
    tick();
    // expect(component.isLoading).toBeFalsy();
    expect(component.contracts).toBeNull();
  }));

  it('when ngOnDestroy is called contracts should be null  ', () => {
    component.ngOnDestroy();
    expect(component.contracts).toBeNull();
  });

  it('when getContractStatus is called and status is Running should return Em curso ', () => {
    const spyStatus = spyOn(component, 'getContractStatus').and.callThrough();
    const status = component.getContractStatus('running');
    expect(spyStatus).toHaveBeenCalled();
    expect(status).toBe('Em curso');
    expect(component.isContractRunning('running')).toBeTruthy();
    expect(component.isContractRunning('closed')).toBeFalsy();
    expect(component.isContractRunning('declined')).toBeFalsy();
    expect(component.isContractRunning('cancelled')).toBeFalsy();
  });

  it('when getContractStatus is called and status is Closed should return Fechado ', () => {
    const spyStatus = spyOn(component, 'getContractStatus').and.callThrough();
    const status = component.getContractStatus('closed');
    expect(spyStatus).toHaveBeenCalled();
    expect(status).toBe('Fechado');
    expect(component.isContractCompleted('closed')).toBeTruthy();
    expect(component.isContractCompleted('running')).toBeFalsy();
    expect(component.isContractCompleted('declined')).toBeFalsy();
    expect(component.isContractCompleted('cancelled')).toBeFalsy();
  });

  it('when getContractStatus is called and status is Arrears should return Em atraso ', () => {
    const spyStatus = spyOn(component, 'getContractStatus').and.callThrough();
    const status = component.getContractStatus('declined');
    expect(spyStatus).toHaveBeenCalled();
    expect(status).toBe('Em atraso');
    expect(component.isContractArrears('declined')).toBeTruthy();
    expect(component.isContractArrears('running')).toBeFalsy();
    expect(component.isContractArrears('closed')).toBeFalsy();
    expect(component.isContractArrears('cancelled')).toBeFalsy();
  });

  it('when getContractStatus is called and status is Lawsuit should return Acção Judicial ', () => {
    const spyStatus = spyOn(component, 'getContractStatus').and.callThrough();
    const status = component.getContractStatus('pending');
    expect(spyStatus).toHaveBeenCalled();
    expect(status).toBe('Acção Judicial');
  });

  it('when getContractStatus is called and status is Cancelled should return Cancelado ', () => {
    const spyStatus = spyOn(component, 'getContractStatus').and.callThrough();
    const status = component.getContractStatus('cancelled');
    expect(spyStatus).toHaveBeenCalled();
    expect(status).toBe('Cancelado');
    expect(component.isContractCanceled('cancelled')).toBeTruthy();
    expect(component.isContractCanceled('running')).toBeFalsy();
    expect(component.isContractCanceled('closed')).toBeFalsy();
    expect(component.isContractCanceled('declined')).toBeFalsy();
  });

  it('when getContractStatus is called and status is Payment Plan should return Plano de Pagamento ', () => {
    const spyStatus = spyOn(component, 'getContractStatus').and.callThrough();
    const status = component.getContractStatus('payment_plan');
    expect(spyStatus).toHaveBeenCalled();
    expect(status).toBe('Plano de Pagamento');
  });
});
