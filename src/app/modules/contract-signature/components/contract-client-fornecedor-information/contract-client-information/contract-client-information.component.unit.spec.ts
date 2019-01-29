import { ContractClientInformationComponent } from './contract-client-information.component';
import { MatDialog } from '@angular/material';
import { ContractSignatureServiceMock } from '../../../../../core/mocks/contractSignature.service.mock';

describe('ChangeCompanyEquipmentAddressModalComponent', () => {
  let component: ContractClientInformationComponent;
  let service;
  let dialog: MatDialog;

  beforeEach(() => {
    dialog = jasmine.createSpyObj('dialog', ['open']);
    service = new ContractSignatureServiceMock();
    component = new ContractClientInformationComponent(dialog);
    component.clientInfo = service.contractClientInfoTestData;
    component.equipmentInfo = service.contractEquipmentInfoTestData;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open edit company address dialog box when openEditAdresssDialog method is called', () => {
    component.openEditAddressDialog('company');
    expect(dialog.open).toHaveBeenCalled();
  });

  it('should open edit equipment address dialog box when openEditAdresssDialog method is called', () => {
    component.openEditAddressDialog('equipment');
    expect(dialog.open).toHaveBeenCalled();
  });

  it('clientInfo should be redefined when openEditAddressObserver method is called', () => {
    component.openEditAddressObserver(component.clientInfo, 'company');
    expect(component.clientInfo).toBeDefined();
  });

  it('equipmentInfo should be redefined when openEditAddressObserver method is called', () => {
    component.openEditAddressObserver(component.equipmentInfo, 'equipment');
    expect(component.equipmentInfo).toBeDefined();
  });

  it('showPanel should change accordingly when openEditAddressObserver method is called', () => {
    const event = {
      checked: true
    };
    component.showPanel = false;
    component.changeEquipmentAddress(event);
    expect(component.showPanel).toBeTruthy();
  });

  it('equipmentInfo and clientInfo should be null when ngOnDestroy is called', () => {
    component.addressDialogCloseSub = jasmine.createSpyObj('component.addressDialogCloseSub', ['unsubscribe']);
    component.addressDialogSub = jasmine.createSpyObj('component.addressDialogSub', ['unsubscribe']);
    component.ngOnDestroy();
    expect(component.clientInfo).toBeNull();
    expect(component.equipmentInfo).toBeNull();
    expect(component.addressDialogCloseSub.unsubscribe).toHaveBeenCalled();
    expect(component.addressDialogSub.unsubscribe).toHaveBeenCalled();
  });

});
