import { ChangeCompanyEquipmentAddressModalComponent } from './change-company-equipment-address-modal.component';
import { MatDialogRef } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { throwError } from 'rxjs';
import { ContractSignatureServiceMock } from '../../../../../core/mocks/contractSignature.service.mock';
import { LoadingService } from '../../../../../core/services/loading.service';
import { MatSnackBar } from '@angular/material';

describe('ChangeCompanyEquipmentAddressModalComponent', () => {
  let component: ChangeCompanyEquipmentAddressModalComponent;
  let service;
  let data;
  let matDialogRef: MatDialogRef<ChangeCompanyEquipmentAddressModalComponent>;
  let formBuilder: FormBuilder;
  let loadingService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    matDialogRef = jasmine.createSpyObj('matDialogRef', ['close']);
    snackBar = jasmine.createSpyObj('snackBar', ['openFromComponent']);
    formBuilder = new FormBuilder();
    service = new ContractSignatureServiceMock();
    loadingService = new LoadingService();
    data = service.clientEquipmentInfoModalTestData;
    component = new ChangeCompanyEquipmentAddressModalComponent(formBuilder, matDialogRef, data, service, loadingService, snackBar);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('change address form fields and modal title should be defined when ngOnInit is called', () => {
    component.modalTitle = service.clientEquipmentInfoModalTestData;
    component.ngOnInit();
    expect(component.modalTitle).toBeDefined();
    expect(component.modalTitle).toBe('Alterar Morada da Empresa');
    expect(component.changeAddressForm.controls['street']).toBeDefined();
    expect(component.changeAddressForm.controls['num']).toBeDefined();
    expect(component.changeAddressForm.controls['floor']).toBeDefined();
    expect(component.changeAddressForm.controls['code']).toBeDefined();
    expect(component.changeAddressForm.controls['city']).toBeDefined();
    expect(component.changeAddressForm.controls['country']).toBeDefined();
  });

  it('change address form fields should be blank and modal title should be Morada de Entrega do Equipamento ' +
    'when data type is equipment and field values are not defined', () => {
      component.data = service.clientEquipmentInfoModalEmptyTestData;
      component.ngOnInit();
      expect(component.modalTitle).toBeDefined();
      expect(component.modalTitle).toBe('Morada de Entrega do Equipamento');
      expect(component.changeAddressForm.controls['street'].value).toBe('');
      expect(component.changeAddressForm.controls['num'].value).toBe('');
      expect(component.changeAddressForm.controls['floor'].value).toBe('');
      expect(component.changeAddressForm.controls['code'].value).toBe('');
      expect(component.changeAddressForm.controls['city'].value).toBe('');
      expect(component.changeAddressForm.controls['country'].value).toBe('');
    });

  it('when updateAddressInformation is called address should be defined', () => {
    component.ngOnInit();
    component.updateAddressInformation(component.changeAddressForm);
    expect(component.address).toBeDefined();
  });

  it('when updateAddress is called isLoading should be true ', () => {
    component.ngOnInit();
    spyOn(component, 'setLoading');
    component.updateAddress(component.changeAddressForm);
    expect(component.setLoading).toHaveBeenCalled();
  });

  it('change address modal should be closed,' +
    'and isLoading should be true, when updateAddress is called successfully', () => {
      component.ngOnInit();
      component.updateAddress(component.changeAddressForm);
      expect(matDialogRef.close).toHaveBeenCalled();
      expect(component.isLoading).toBeFalsy();
    });

  it('address will not be updated and isLoading should be false, when updateAddress is called with error', () => {
    component.ngOnInit();
    spyOn(service, 'putAddress').and.returnValue(throwError(new Error('Error: Failed to fetch data!')));
    component.updateAddressInformation(component.changeAddressForm);
    expect(component.isLoading).toBeFalsy();
  });

  it('address will not be updated, updateAddress will not be called and isLoading should be false when form is not valid', () => {
    component.data = service.clientEquipmentInfoModalEmptyTestData;
    component.ngOnInit();
    component.updateAddressInformation(component.changeAddressForm);
    expect(component.isLoading).toBeFalsy();
  });

  it('modal title  should be null when ngOnDestroy is called', () => {
    component.putAddressSubscription = jasmine.createSpyObj('component.postAddressSubscription', ['unsubscribe']);
    component.ngOnDestroy();
    expect(component.modalTitle).toBeNull();
    expect(component.putAddressSubscription.unsubscribe).toHaveBeenCalled();
  });

});
