import { SignupVerifyComponent } from './signup-verify-modal.component';
import { MatDialogRef } from '@angular/material';
import { SignupUser } from '../../../../../shared/models/signupuser';

describe('SignupVerifyComponent', () => {
  let component: SignupVerifyComponent;
  let matDialogRef: MatDialogRef<SignupVerifyComponent>;
  const passData: SignupUser = new SignupUser();
  passData.companyname = 'Test';
  passData.fullaname = 'Test Test';
  passData.email = 'test@test.com';
  passData.nif = '123456789';
  passData.pass = 'asd';
  passData.tele = '123456789';

  beforeEach(() => {
    matDialogRef = jasmine.createSpyObj('matDialogRef', ['close']);
    component = new SignupVerifyComponent(matDialogRef, passData);
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('ngoninit should initate call to setup a form for verifying number', () => {
    spyOn(component, 'setSignupVerifyForm');
    component.ngOnInit();
    expect(component.setSignupVerifyForm).toHaveBeenCalled();
  });

  it('setSignupVerifyForm should set a form for verifying number', () => {
    component.signupVerifyForm = null;
    component.setSignupVerifyForm();
    expect(component.signupVerifyForm.contains('code')).toBeTruthy();
  });

  it('setTeleNumber should return masked telephone string when passed telephone number', () => {
    const maskedTeleNumber = component.setTeleNumber(passData);
    expect(maskedTeleNumber).toBe('*******89');
  });

  it('setSignupVerifyForm if subimtted with valid, formatted data, form should be submitted and event should be emitted', () => {
    spyOn(component.verifyNo, 'emit').and.callThrough();
    component.setSignupVerifyForm();
    component.signupVerifyForm.controls['code'].setValue('test');
    component.verify(component.signupVerifyForm);
    expect(component.verifyNo.emit).toHaveBeenCalled();
  });
});
