import { ContractSignatureFormComponent } from './contract-signature-form.component';
import { FormBuilder } from '@angular/forms';
import { ContractSignatureServiceMock } from '../../../../core/mocks/contractSignature.service.mock';

describe('ContractSignatureFormComponent', () => {
  let component: ContractSignatureFormComponent;
  let formBuilder: FormBuilder;
  let service;

  beforeEach(() => {
    formBuilder = new FormBuilder();
    service = new ContractSignatureServiceMock();
    component = new ContractSignatureFormComponent(formBuilder, service);
    component.personalGuarantee = service.personalGuaranteeTestData;
    component.ngOnInit();
    component.signatureForm.controls['name'].setValue('test');
    component.signatureForm.controls['telephoneNumber'].setValue('120-120');
    component.signatureForm.controls['street'].setValue('211');
    component.signatureForm.controls['nif'].setValue('123123');
    component.signatureForm.controls['postalCode'].setValue('123123');
    component.signatureForm.controls['city'].setValue('test');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('signatureForm values are set when ngOnInit is called', () => {
    expect(component.signatureForm.controls['name']).toBeDefined();
    expect(component.signatureForm.controls['telephoneNumber']).toBeDefined();
    expect(component.signatureForm.controls['street']).toBeDefined();
    expect(component.signatureForm.controls['nif']).toBeDefined();
    expect(component.signatureForm.controls['postalCode']).toBeDefined();
    expect(component.signatureForm.controls['city']).toBeDefined();
  });

  it('contact should be null, when ngOnDestroy is called', () => {
    component.contractSignatureChangeIbanSubscription = jasmine.createSpyObj('component.contractSignatureChangeIbanSubscription',
      ['unsubscribe']);
    component.contractSignatureFormSubscription = jasmine.createSpyObj('component.contractSignatureFormSubscription', ['unsubscribe']);
    component.ngOnDestroy();
    expect(component.contact).toBeNull();
    expect(component.contractSignatureChangeIbanSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.contractSignatureFormSubscription.unsubscribe).toHaveBeenCalled();
  });

});
