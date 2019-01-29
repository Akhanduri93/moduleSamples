import { fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { RecoverPasswordComponent } from './recover-password.component';
import { AuthenticationServiceMock } from '../../../../core/mocks/authentication.service.mock';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material';

describe('RecoverPasswordComponent Unit', () => {
    let component: RecoverPasswordComponent;
    let authService;
    let snackBar: MatSnackBar;
    let router;
    let breakpointObserver: BreakpointObserver;

    beforeEach(() => {
        authService = new AuthenticationServiceMock();
        router = jasmine.createSpyObj('router', ['navigate', 'navigateByUrl']);
        snackBar = jasmine.createSpyObj('snackBar', ['openFromComponent']);
        breakpointObserver = jasmine.createSpyObj('breakpointObserver', ['observe']);
        component = new RecoverPasswordComponent(authService, router, breakpointObserver, snackBar);

    });

    it('should create a component  ', () => {
        expect(component).toBeTruthy();
    });

    it('when ngOnInit is called both form Controls should be created and not be null', () => {
        component.ngOnInit();
        expect(component.email).not.toBeNull();
        expect(component.recoverPassRxjs).not.toBeNull();
    });

    it('when resendPassword is called with valid parameters the status of the form should be valid.' +
    ' Morover, the recover pass service should be called. With success, the recoverd variable should be true' +
    'as well', fakeAsync(() => {
        const authServSpy = spyOn(authService, 'recoverPassword').and.returnValue(of(true));
        component.setRecoverPasswordForm();
        component.email.setValue('brodrigues@candor.pt');
        component.recoverPassRxjs.clearAsyncValidators();
        component.recoverPassRxjs.clearValidators();
        component.recoverPassRxjs.updateValueAndValidity();
        component.resendPassword();
        tick();
        expect(authServSpy).toHaveBeenCalled();
        expect(component.recovered).toBeTruthy();
        expect(component.recoverPassRxjs.status).toBe('VALID');
    }));

    it('when resendPassword is called with valid parameters the status of the form should be valid.' +
    ' Morover, the recover pass service should be called. With error, the recoverd variable should be false' +
    'as well', fakeAsync(() => {
        const authServSpy = spyOn(authService, 'recoverPassword').and.returnValue(throwError(new Error()));
        component.setRecoverPasswordForm();
        component.email.setValue('brodrigues@candor.pt');
        component.recoverPassRxjs.clearAsyncValidators();
        component.recoverPassRxjs.clearValidators();
        component.recoverPassRxjs.updateValueAndValidity();
        component.resendPassword();
        tick();
        expect(authServSpy).toHaveBeenCalled();
        expect(component.recovered).toBeFalsy();
        expect(component.recoverPassRxjs.status).toBe('VALID');
    }));

});
