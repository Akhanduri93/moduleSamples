import { UserSignupComponent } from './user-signup.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SignupVerifyComponent } from './signup-verify-modal/signup-verify-modal.component';
import { SignupUser } from '../../../../shared/models/signupuser';
import { VerificationServiceMock } from '../../../../core/mocks/verification.service.mock';
import { SignupServiceMock } from '../../../../core/mocks/signup.service.mock';
import { AuthenticationServiceMock } from '../../../../core/mocks/authentication.service.mock';
import { fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

describe('SignupFormComponent', () => {
  let component: UserSignupComponent;
  let signupService: SignupServiceMock;
  let verificationService: VerificationServiceMock;
  let authenticationService;
  let router;
  let snackBar;
  let matdialog: MatDialog;
  let matDialogRef: MatDialogRef<SignupVerifyComponent>;

  beforeEach(() => {
    signupService = new SignupServiceMock();
    verificationService = new VerificationServiceMock();
    authenticationService = new AuthenticationServiceMock();
    router = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);
    snackBar = jasmine.createSpyObj('snackBar', ['openFromComponent']);
    matdialog = jasmine.createSpyObj('matdialog', ['open', 'close']);
    matDialogRef = jasmine.createSpyObj('matDialogRef', ['close']);
    component = new UserSignupComponent(verificationService, signupService, authenticationService, router, snackBar, matdialog);
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('ngoninit should initate call to setVendorSignupForm', () => {
    spyOn(component, 'setUserSignupForm');
    component.ngOnInit();
    expect(component.setUserSignupForm).toHaveBeenCalled();
  });

  it('setVendorSignupForm should set a form', () => {
    component.userSignupForm = null;
    component.user = new SignupUser();
    component.setUserSignupForm();
    expect(component.userSignupForm.contains('nomeconta')).toBeTruthy();
    expect(component.userSignupForm.contains('tele')).toBeTruthy();
    expect(component.userSignupForm.contains('email')).toBeTruthy();
    // expect(component.userSignupForm.contains('password')).toBeTruthy();
    expect(component.userSignupForm.contains('user')).toBeTruthy();
    expect(component.userSignupForm.status).toBe('INVALID');
  });

  it('getNameErrorMessage should return correct message when name not provided', () => {
    component.user = new SignupUser();
    component.setUserSignupForm();
    component.userSignupForm.controls['nomeconta'].setValue('');
    component.userSignupForm.clearAsyncValidators();
    component.userSignupForm.clearValidators();
    component.userSignupForm.updateValueAndValidity();
    expect(component.getNameErrorMessage()).toBe('Nome é obrigatório.');
  });

  it('getNameErrorMessage should return correct message when name provided in wrong format', () => {
    component.user = new SignupUser();
    component.setUserSignupForm();
    component.userSignupForm.controls['nomeconta'].setValue('123');
    component.userSignupForm.clearAsyncValidators();
    component.userSignupForm.clearValidators();
    component.userSignupForm.updateValueAndValidity();
    expect(component.getNameErrorMessage()).toBe('Primeiro e último nome obrigatórios.');
  });

  it('getEmailErrorMessage should return correct message when email not provided', () => {
    component.user = new SignupUser();
    component.setUserSignupForm();
    component.userSignupForm.controls['email'].setValue('');
    component.userSignupForm.clearAsyncValidators();
    component.userSignupForm.clearValidators();
    component.userSignupForm.updateValueAndValidity();
    expect(component.getEmailErrorMessage()).toBe('Email é obrigatório.');
  });

  it('getEmailErrorMessage should return correct message when email provided in wrong format', () => {
    component.user = new SignupUser();
    component.setUserSignupForm();
    component.userSignupForm.controls['email'].setValue('acorreia@');
    component.userSignupForm.clearAsyncValidators();
    component.userSignupForm.clearValidators();
    component.userSignupForm.updateValueAndValidity();
    expect(component.getEmailErrorMessage()).toBe('Email inválido.');
  });

  it('getTelephoneErrorMessage should return correct message when tele not provided', () => {
    component.user = new SignupUser();
    component.setUserSignupForm();
    component.userSignupForm.controls['tele'].setValue('');
    component.userSignupForm.clearAsyncValidators();
    component.userSignupForm.clearValidators();
    component.userSignupForm.updateValueAndValidity();
    expect(component.getTelephoneErrorMessage()).toBe('Contacto telefónico é obrigatório.');
  });

  it('getTelephoneErrorMessage should return correct message when tele provided in wrong format', () => {
    component.user = new SignupUser();
    component.setUserSignupForm();
    component.userSignupForm.controls['tele'].setValue('123');
    component.userSignupForm.clearAsyncValidators();
    component.userSignupForm.clearValidators();
    component.userSignupForm.updateValueAndValidity();
    expect(component.getTelephoneErrorMessage()).toBe('Contacto telefónico inválido.');
  });

  // it('Input field functions should evaluate field and return (true or false) if 1 is passed.' +
  //   'If 0 is passed it should return the error message', () => {
  //     component.user = new SignupUser();
  //     component.setUserSignupForm();
  //     component.userSignupForm.controls['password'].markAsTouched();
  //     expect(component.getEmptyPasswordError(0)).toBeTruthy();
  //     let errorMessage = 'A palavra-passe não pode estar vazia.';
  //     expect(component.getEmptyPasswordError(1)).toBe(errorMessage);

  //     component.userSignupForm.controls['password'].setValue('ABC123#!^_-');
  //     expect(component.getInvalidCharactersPasswordError(0)).toBeTruthy();
  //     errorMessage = 'A sua palavra-passe contem caracteres inválidos.';
  //     expect(component.getInvalidCharactersPasswordError(1)).toBe(errorMessage);

  //     component.userSignupForm.controls['password'].setValue('321');
  //     expect(component.getMinLenghtPasswordError(0)).toBeTruthy();
  //     errorMessage = 'O tamanho mínimo da palavra-passe são 8 caracteres.';
  //     expect(component.getMinLenghtPasswordError(1)).toBe(errorMessage);

  //     component.userSignupForm.controls['password'].setValue('321231321321321321321');
  //     expect(component.getMaxLenghtPasswordError(0)).toBeTruthy();
  //     errorMessage = 'O tamanho maximo da palavra-passe são 16 caracteres.';
  //     expect(component.getMaxLenghtPasswordError(1)).toBe(errorMessage);
  // });

  it('userSignup when passed with correct data should initiate a check for user presence and ' +
    'also initiate call to send verification code mssg', fakeAsync(() => {
      spyOn(authenticationService, 'validateEmail').and.callThrough();
      // spyOn(component, 'sendVerificationCode').and.callThrough();
      component.user = new SignupUser();
      component.setUserSignupForm();
      component.userSignupForm.controls['nomeconta'].setValue('Test Test ');
      component.userSignupForm.controls['email'].setValue('testing@test.com');
      component.userSignupForm.controls['tele'].setValue('123456789');
      // component.userSignupForm.controls['password'].setValue('abcdefgh');
      component.userSignupForm.clearAsyncValidators();
      component.userSignupForm.clearValidators();
      component.userSignupForm.updateValueAndValidity();
      component.userSignup(component.userSignupForm);
      tick();
      expect(authenticationService.validateEmail).toHaveBeenCalled();
      // expect(component.sendVerificationCode).toHaveBeenCalled();
    }));

  it('userSignup when passed with existing account data should initiate a check for user presence and ' +
    'should initiate a call to snackbar to inform user about the existence of the account', fakeAsync(() => {
      spyOn(authenticationService, 'validateEmail').and.callThrough();
      component.user = new SignupUser();
      component.setUserSignupForm();
      component.userSignupForm.controls['nomeconta'].setValue('Test Test ');
      component.userSignupForm.controls['email'].setValue('test@test.com');
      component.userSignupForm.controls['tele'].setValue('123456789');
      // component.userSignupForm.controls['password'].setValue('abcdefgh');
      component.userSignupForm.clearAsyncValidators();
      component.userSignupForm.clearValidators();
      component.userSignupForm.updateValueAndValidity();
      component.userSignup(component.userSignupForm);
      tick();
      expect(authenticationService.validateEmail).toHaveBeenCalled();
      expect(snackBar.openFromComponent).toHaveBeenCalled();
    }));

  it('userSignup when passed with account data and got failed due to some reasons ' +
    'should initiate a call to snackbar to inform user about the failure', fakeAsync(() => {
      spyOn(authenticationService, 'validateEmail').and.returnValue(throwError('Error'));
      component.user = new SignupUser();
      component.setUserSignupForm();
      component.userSignupForm.controls['nomeconta'].setValue('Test Test ');
      component.userSignupForm.controls['email'].setValue('test@test.com');
      component.userSignupForm.controls['tele'].setValue('123456789');
      // component.userSignupForm.controls['password'].setValue('abcdefgh');
      component.userSignupForm.clearAsyncValidators();
      component.userSignupForm.clearValidators();
      component.userSignupForm.updateValueAndValidity();
      component.userSignup(component.userSignupForm);
      tick();
      expect(authenticationService.validateEmail).toHaveBeenCalled();
      expect(snackBar.openFromComponent).toHaveBeenCalled();
    }));

  it('sendVerificationCode when passed with correct data should initiate a call to API to send verification number ' +
    'also should initiate a call to show modal to enter the verification code', fakeAsync(() => {
      spyOn(verificationService, 'sendVerificationCode').and.callThrough();
      spyOn(component, 'showVerificationModal').and.callThrough();
      component.user = new SignupUser();
      component.setUserSignupForm();
      const account = new SignupUser();
      account.companyname = 'Test';
      account.fullaname = 'Test Test';
      account.email = 'testing@test.com';
      account.nif = '123456789';
      account.tele = '123456789';
      account.pass = 'abc';
      component.sendVerificationCode(account);
      tick();
      expect(verificationService.sendVerificationCode).toHaveBeenCalled();
      expect(component.showVerificationModal).toHaveBeenCalled();
    }));

  it('sendVerificationCode when passed with account data and got failed due to some reasons ' +
    'should initiate a call to snackbar to inform user about the failure', fakeAsync(() => {
      spyOn(verificationService, 'sendVerificationCode').and.returnValue(throwError('Error'));
      component.user = new SignupUser();
      component.setUserSignupForm();
      const account = new SignupUser();
      account.companyname = 'Test';
      account.fullaname = 'Test Test';
      account.email = 'testing@test.com';
      account.nif = '123456789';
      account.tele = '123456789';
      account.pass = 'abc';
      component.sendVerificationCode(account);
      tick();
      expect(verificationService.sendVerificationCode).toHaveBeenCalled();
      expect(snackBar.openFromComponent).toHaveBeenCalled();
    }));

  it('showVerificationModal when passed with correct data should initiate a call to show modal', fakeAsync(() => {
    spyOn(component, 'verifySignupObserver').and.callThrough();
    const account = new SignupUser();
    account.companyname = 'Test';
    account.fullaname = 'Test Test';
    account.email = 'testing@test.com';
    account.nif = '123456789';
    account.tele = '123456789';
    account.pass = 'abc';
    component.showVerificationModal(account);
    tick();
    expect(matdialog.open).toHaveBeenCalled();
    expect(component.verifySignupObserver).toHaveBeenCalled();
  }));


  it('verifyContact when passed with correct data should initiate a call to check the confirmation code ' +
    'also should initiate a call emit event', fakeAsync(() => {
      spyOn(verificationService, 'checkVerificationCode').and.callThrough();
      spyOn(component.verified, 'emit');
      const account = new SignupUser();
      account.companyname = 'Test';
      account.fullaname = 'Test Test';
      account.email = 'testing@test.com';
      account.nif = '123456789';
      account.tele = '123456789';
      account.pass = 'abc';

      const verifyCode = 'asd';
      component.verifySignupDailog = matDialogRef;
      component.verifyContact(verifyCode, account);
      tick();
      expect(verificationService.checkVerificationCode).toHaveBeenCalled();
      expect(component.verified.emit).toHaveBeenCalled();
    }));

  it('verifyContact if returned false due to some reasons ' +
    'should initiate a call to snack bar to inform user', fakeAsync(() => {
      spyOn(verificationService, 'checkVerificationCode').and.returnValue(of(false));
      const account = new SignupUser();
      account.companyname = 'Test';
      account.fullaname = 'Test Test';
      account.email = 'testing@test.com';
      account.nif = '123456789';
      account.tele = '123456789';
      account.pass = 'abc';

      const verifyCode = 'asd';
      component.verifySignupDailog = matDialogRef;
      component.verifyContact(verifyCode, account);
      tick();
      expect(verificationService.checkVerificationCode).toHaveBeenCalled();
      expect(snackBar.openFromComponent).toHaveBeenCalled();
    }));

  it('verifyContact got failed due to some reasons ' +
    'should initiate a call to snack bar to inform user', fakeAsync(() => {
      spyOn(verificationService, 'checkVerificationCode').and.returnValue(throwError('Error'));
      const account = new SignupUser();
      account.companyname = 'Test';
      account.fullaname = 'Test Test';
      account.email = 'testing@test.com';
      account.nif = '123456789';
      account.tele = '123456789';
      account.pass = 'abc';

      const verifyCode = 'asd';
      component.verifySignupDailog = matDialogRef;
      component.verifyContact(verifyCode, account);
      tick();
      expect(verificationService.checkVerificationCode).toHaveBeenCalled();
      expect(snackBar.openFromComponent).toHaveBeenCalled();
    }));

  it('checkIfExists when passed with correct data should initiate a call to snackbar  with success message' +
    'also should initiate a call to navigate to login', fakeAsync(() => {
      component.user = new SignupUser();
      component.setUserSignupForm();
      component.userSignupForm.controls['email'].setValue('test@test.com');
      component.checkIfExists();
      tick();
      expect(component.userPresentError).toBe(true);
      expect(component.userSignupForm.controls['email'].status).toBe('INVALID');
    }));

  it('checkIfExists got failed due to some reasons ' +
    'should initiate a call to snack bar to inform user', fakeAsync(() => {
      spyOn(authenticationService, 'validateEmail').and.returnValue(throwError('Error'));
      component.user = new SignupUser();
      component.setUserSignupForm();
      component.userSignupForm.controls['email'].setValue('test@test.com');
      component.checkIfExists();
      tick();
      expect(component.enableSubmit).toBe(false);
    }));

  it('ngOnDestroy should unsubscribe all the subscription if any', () => {
    component.verifySignupDialogSub = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    component.verifySignupDialogCloseSub = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    component.userPresentSubscription = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    component.sendVerificationC = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    component.checkVerificationC = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    component.ngOnDestroy();
    expect(component.verifySignupDialogSub.unsubscribe).toHaveBeenCalled();
    expect(component.verifySignupDialogCloseSub.unsubscribe).toHaveBeenCalled();
    expect(component.userPresentSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.sendVerificationC.unsubscribe).toHaveBeenCalled();
    expect(component.checkVerificationC.unsubscribe).toHaveBeenCalled();
  });
});
