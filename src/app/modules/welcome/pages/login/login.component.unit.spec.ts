import { fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

import { LoginComponent } from './login.component';

import { ActivatedRouteMock } from '../../../../core/mocks/route.mock';
import { AuthenticationServiceMock } from '../../../../core/mocks/authentication.service.mock';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material';

describe('LoginComponentUnit', () => {
  let component: LoginComponent;
  let authenticationService;
  let router;
  let route;
  let breakpointObserver;
  const emailControl = new FormControl('cdddd', [Validators.required, Validators.email], );
  const passwordControl = new FormControl('ddddd', [Validators.required]);
  let snackbar: MatSnackBar;

  const fakeLogin = {
    email: emailControl,
    password: passwordControl
  };

  beforeEach(() => {
    router = jasmine.createSpyObj('router', ['navigate', 'navigateByUrl']);
    authenticationService = new AuthenticationServiceMock();
    route = new ActivatedRouteMock();
    breakpointObserver = jasmine.createSpyObj('breakpointObserver', ['observe']);
    snackbar = jasmine.createSpyObj('snackBar', ['openFromComponent']);
    component = new LoginComponent(route, router, authenticationService, breakpointObserver, snackbar);
    component.returnUrl = '/portal/contracts';
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should call logOut on ngonInit', fakeAsync(() => {
    const spyLogout = spyOn(authenticationService, 'logout').and.callThrough();
    component.ngOnInit();
    tick();
    expect(spyLogout).toHaveBeenCalled();
  }));

  it('when login is called with anything inside should produce error, isLoading should be false'
    + 'and detectChanges should be called also form status should be invalid', fakeAsync(() => {
      const fb = new FormBuilder();
      emailControl.setValue('ddddd');
      passwordControl.setValue('eeeeee');
      const form = fb.group(fakeLogin);
      component.loginFormRxjs = form;
      component.loginFormRxjs.clearAsyncValidators();
      component.loginFormRxjs.clearValidators();
      component.loginFormRxjs.updateValueAndValidity();
      component.login(component.loginFormRxjs);
      expect(component.loginSubscription).not.toBeDefined();
      tick();
      expect(component.loginFormRxjs.status).toBe('INVALID');
    }));

  it('when login is called with valid parameters the status of the form should be valid', fakeAsync(() => {
    component.setLoginForm();
    component.email.setValue('brodrigues@candor.pt');
    component.password.setValue('123456');
    component.loginFormRxjs.clearAsyncValidators();
    component.loginFormRxjs.clearValidators();
    component.loginFormRxjs.updateValueAndValidity();
    expect(component.loginFormRxjs.status).toBe('VALID');
  }));

  it('should enter portal', fakeAsync(() => {
    const spyLogin = spyOn(authenticationService, 'login').and.callThrough();
    component.setLoginForm();
    component.email.setValue('acorreia@candor.pt');
    component.password.setValue('CXIkRIxt');
    expect(component.loginFormRxjs.status).toBe('VALID');
    component.login(component.loginFormRxjs);
    expect(component.loginSubscription).toBeDefined();
    expect(component.loginFormRxjs.disabled).toBe(true);
    expect(spyLogin).toHaveBeenCalled();
  }));

  it('should fail to login', fakeAsync(() => {
    const spyLogin = spyOn(authenticationService, 'login').and.returnValue(throwError('Error'));
    component.setLoginForm();
    component.email.setValue('acorreia@candor.pt');
    component.password.setValue('wrong password');
    component.login(component.loginFormRxjs);
    expect(component.loginSubscription).toBeDefined();
    expect(component.loginFormRxjs.enabled).toBe(true);
  }));

  it('should return email required error message', () => {
    component.setLoginForm();
    component.loginFormRxjs.clearAsyncValidators();
    component.loginFormRxjs.clearValidators();
    component.loginFormRxjs.updateValueAndValidity();
    expect(component.getEmailErrorMessage()).toBe('Email é obrigatório.');
  });

  it('should return email invalid error message', () => {
    component.setLoginForm();
    component.email.setValue('acorreia@');
    component.loginFormRxjs.clearAsyncValidators();
    component.loginFormRxjs.clearValidators();
    component.loginFormRxjs.updateValueAndValidity();
    expect(component.getEmailErrorMessage()).toBe('Email inválido.');
  });

  it('should return password required error message', () => {
    component.setLoginForm();
    component.loginFormRxjs.clearAsyncValidators();
    component.loginFormRxjs.clearValidators();
    component.loginFormRxjs.updateValueAndValidity();
    expect(component.getPasswordErrorMessage()).toBe('Password é obrigatória.');
  });

  it('should not unsubscribe login before the login subscription', () => {
    component.ngOnDestroy();
    expect(component.loginSubscription).not.toBeDefined();
  });

  it('should unsubscribe login after component is destroyed', () => {
    spyOn(authenticationService, 'login').and.callThrough();
    component.setLoginForm();
    component.email.setValue('acorreia@candor.pt');
    component.password.setValue('CXIkRIxt');
    component.login(component.loginFormRxjs);
    const spyLoginSubscription = spyOn(component.loginSubscription, 'unsubscribe').and.callThrough();
    expect(component.loginSubscription).toBeDefined();
    component.ngOnDestroy();
    expect(spyLoginSubscription).toHaveBeenCalled();
  });
});
