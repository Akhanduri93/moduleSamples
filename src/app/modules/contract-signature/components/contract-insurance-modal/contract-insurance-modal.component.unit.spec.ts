import { ContractInsuranceModalComponent } from './contract-insurance-modal.component';
import { MatDialogRef } from '@angular/material';

describe('ContractClausesComponent', () => {
  let component: ContractInsuranceModalComponent;
  let dialogref: MatDialogRef<ContractInsuranceModalComponent>;
  let breakpointObserver;

  beforeEach(() => {
    breakpointObserver = jasmine.createSpyObj('breakpointObserver', ['observe']);
    dialogref = jasmine.createSpyObj('dialogref', ['close']);
    component = new ContractInsuranceModalComponent(dialogref, breakpointObserver);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('insuranceData should be null when ngOnDestroy is called', () => {
    component.ngOnDestroy();
    expect(component.insuranceData).toBeNull();
  });

  it('closeModal should initate a call to close dialog', () => {
       component.closeModal();
       expect(dialogref.close).toHaveBeenCalled();
   });

});
