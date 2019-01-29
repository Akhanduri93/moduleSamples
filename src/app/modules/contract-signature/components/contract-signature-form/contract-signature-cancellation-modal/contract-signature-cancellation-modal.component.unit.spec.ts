import { ContractSignatureCancellationModalComponent } from './contract-signature-cancellation-modal.component';
import { MatDialogRef } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { throwError } from 'rxjs';
import { ContractSignatureServiceMock } from '../../../../../core/mocks/contractSignature.service.mock';
import { LoadingService } from '../../../../../core/services/loading.service';
import { MatSnackBar } from '@angular/material';

describe('ContractSignatureCancellationModalComponent', () => {
  let component: ContractSignatureCancellationModalComponent;
  let matDialogRef: MatDialogRef<ContractSignatureCancellationModalComponent>;
  let formBuilder: FormBuilder;
  let service;
  let loadingService;
  let router;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    matDialogRef = jasmine.createSpyObj('matDialogRef', ['close']);
    snackBar = jasmine.createSpyObj('snackBar', ['openFromComponent']);
    formBuilder = new FormBuilder();
    service = new ContractSignatureServiceMock();
    loadingService = new LoadingService();
    const data = {
      docRecipientId: 'a8000E13'
    };
    component = new ContractSignatureCancellationModalComponent(formBuilder, matDialogRef, service, data, router, loadingService, snackBar);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cancellationForm should be defined when ngOnInit is called', () => {
    component.ngOnInit();
    expect(component.cancellationForm.contains['comment']).toBeUndefined();
  });

  it('isLoading should be true when submitCancelApplicationDescription is called', () => {
    component.ngOnInit();
    component.cancellationForm.controls['reason'].setValue('Os meus dados estão incorrectos');
    component.cancellationForm.controls['comment'].setValue('test');
    spyOn(component, 'setLoading');
    component.submitCancelApplicationDescription(component.cancellationForm);
    expect(component.setLoading).toHaveBeenCalled();
  });

  it('should submit the form successfully and isLoading should be false' +
    'when submitCancelApplicationDescription is called without error', () => {
      component.ngOnInit();
      component.cancellationForm.controls['comment'].setValue('test');
      component.submitCancelApplicationDescription(component.cancellationForm);
      expect(matDialogRef.close).toHaveBeenCalled();
      expect(component.isLoading).toBeFalsy();
    });

  it('isLoading should be false when postDeclineContractSignature is called with error ', () => {
    component.ngOnInit();
    component.cancellationForm.controls['reason'].setValue('Os meus dados estão incorrectos');
    component.cancellationForm.controls['comment'].setValue('test');
    spyOn(service, 'postDeclineContractSignature').and.returnValue(throwError(new Error('Error: Failed to fetch data!')));
    component.submitCancelApplicationDescription(component.cancellationForm);
    expect(matDialogRef.close).toHaveBeenCalled();
    expect(component.isLoading).toBeFalsy();
  });

  it('should not submit the form and cancelApplication should be null' +
    'when submitCancelApplicationDescription is called with form invalid', () => {
      component.ngOnInit();
      component.cancellationForm.controls['comment'].setValue(null);
      component.submitCancelApplicationDescription(component.cancellationForm);
      expect(matDialogRef.close).toHaveBeenCalled();
      expect(component.cancelApplication).toBeNull();
    });

  it('cancelApplication should be null when ngOnDestroy is called', () => {
    component.cancelApplicationSubscription = jasmine.createSpyObj('component.cancelApplicationSubscription', ['unsubscribe']);
    component.ngOnDestroy();
    expect(component.cancelApplication).toBeNull();
    expect(component.cancelApplicationSubscription.unsubscribe).toHaveBeenCalled();
  });

});
