import { ContractIbanComponent } from './contract-iban.component';
import { MatDialog } from '@angular/material';
import { ContractSignatureServiceMock } from '../../../../core/mocks/contractSignature.service.mock';

describe('ChangeCompanyEquipmentAddressModalComponent', () => {
  let component: ContractIbanComponent;
  let service;
  let dialog: MatDialog;
  beforeEach(() => {
    dialog = jasmine.createSpyObj('dialog', ['open']);
    service = new ContractSignatureServiceMock();
    component = new ContractIbanComponent(dialog, service);
    component.ibanInfo = service.ibanTestData.iban;
    component.applicationPaymentMethod = service.ibanTestData.applicationPaymentMethod;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open edit iban dialog box when openEditIbanDialog method is called', () => {
    component.openEditIbanDialog();
    expect(dialog.open).toHaveBeenCalled();
  });

  it('ibanInfo should be redefined when openIbanDialogObserver method is called', () => {
    component.openIbanDialogObserver(component.ibanInfo);
    expect(component.ibanInfo).toBeDefined();
  });

  it('should call the changeIbanDeclaration method, when changeIbanDeclaration method is called', () => {
    spyOn(service, 'changeIbanDeclaration');
    const value = {
      checked: true
    };
    component.changeIbanDeclaration(value);
    expect(service.changeIbanDeclaration).toHaveBeenCalled();
  });

  it('ibanInfo should be null when ngOnDestroy is called', () => {
    component.ibanDialogCloseSub = jasmine.createSpyObj('component.ibanDialogCloseSub', ['unsubscribe']);
    component.ibanDialogSub = jasmine.createSpyObj('component.ibanDialogSub', ['unsubscribe']);
    component.ngOnDestroy();
    expect(component.ibanInfo).toBeNull();
    expect(component.docRecipientId).toBeNull();
    expect(component.ibanDialogCloseSub.unsubscribe).toHaveBeenCalled();
    expect(component.ibanDialogSub.unsubscribe).toHaveBeenCalled();
  });

});
