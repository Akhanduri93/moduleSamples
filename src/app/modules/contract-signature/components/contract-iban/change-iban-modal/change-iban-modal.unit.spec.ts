import { ChangeIBANModalComponent } from './change-iban-modal.component';
import { MatDialogRef } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { throwError } from 'rxjs';
import { ContractSignatureServiceMock } from '../../../../../core/mocks/contractSignature.service.mock';
import { LoadingService } from '../../../../../core/services/loading.service';
import { MatSnackBar } from '@angular/material';

describe('ChangeIBANModalComponent', () => {
  let component: ChangeIBANModalComponent;
  let data;
  let matDialogRef: MatDialogRef<ChangeIBANModalComponent>;
  let formBuilder: FormBuilder;
  let service;
  let loadingService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    matDialogRef = jasmine.createSpyObj('matDialogRef', ['close']);
    snackBar = jasmine.createSpyObj('snackBar', ['openFromComponent']);
    formBuilder = new FormBuilder();
    service = new ContractSignatureServiceMock();
    loadingService = new LoadingService();
    data = service.ibanTestData;
    component = new ChangeIBANModalComponent(formBuilder, matDialogRef, data, service, loadingService, snackBar);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ibanForm fields should be defined when ngOninit is called', () => {
    component.ngOnInit();
    expect(component.ibanForm.controls['iban'].value).toBeDefined();
  });


  it('dialog box should be closed when closeModal is called  ', () => {
    component.closeModal();
    expect(matDialogRef.close).toHaveBeenCalled();
  });

  it('when updateIbanObserver is called iban should be defined', () => {
    const ibanForm = {
      valid: true,
      value: {
        iban: '123 123'
      }
    };
    component.ngOnInit();
    component.updateIbanObserver(ibanForm);
    expect(component.iban).toBeDefined();
  });

  it('when updateIban is called isLoading should be true ', () => {
    component.ngOnInit();
    spyOn(component, 'setLoading');
    component.updateIban(component.ibanForm);
    expect(component.setLoading).toHaveBeenCalled();
  });

  it('change iban modal should be closed,' +
    'and isLoading should be true, when updateIban is called successfully', () => {
      component.ngOnInit();
      component.updateIban(component.ibanForm);
      expect(matDialogRef.close).toHaveBeenCalled();
      expect(component.isLoading).toBeFalsy();
    });

  it('iban will not be updated and isLoading should be false, when updateIban is called with error', () => {
    component.ngOnInit();
    spyOn(service, 'putIBANData').and.returnValue(throwError(new Error('Error: Failed to fetch data!')));
    component.updateIbanObserver(component.ibanForm);
    expect(component.isLoading).toBeFalsy();
  });

  it('ibanForm fields should be defined when ngOnInit is called', () => {
    component.ngOnInit();
    expect(component.ibanForm.controls['iban'].value).toBeDefined();
  });

  it('iban will not be updated, updateIban will not be called and isLoading should be false when form is not valid', () => {
    component.data.ibanInfo = {
      iban: null
    };
    component.ngOnInit();
    component.updateIbanObserver(component.ibanForm);
    expect(component.isLoading).toBeFalsy();
  });

  it('hideOptions and showNovoIban should be false when onEscolherChange is called', () => {
    const form = {
      value: {
        iban: '1231 1212 1212'
      }
    };
    component.onEscolherChange(form);
    expect(form.value.iban).toBe('');
    expect(component.hideOptions).toBeFalsy();
    expect(component.showNovoIban).toBeFalsy();
  });

  it('select should be false when onNovoIBANChange is called', () => {
    const form = {
      value: {
        selectedOption: '1231 1212 1212'
      }
    };
    component.onNovoIBANChange(form);
    expect(form.value.selectedOption).toBe('');
    expect(component.select).toBeFalsy();
  });

  it('iban should be null when ngOnDestroy is called', () => {
    component.ngOnDestroy();
    expect(component.iban).toBeNull();
  });

});
