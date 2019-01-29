import { ResetPasswordComponent } from './reset-password.component';
import { AuthenticationServiceMock } from '../../../../core/mocks/authentication.service.mock';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { throwError, of } from 'rxjs';

describe('ResetPasswordComponentUnit', () => {
    let component: ResetPasswordComponent;
    let authService;
    let route;
    let router;
    let matDialog: MatDialog;
    let breakpointObserver;
    let snackbar: MatSnackBar;
    let fb: FormBuilder;

    beforeEach(() => {
        route = jasmine.createSpyObj('route', ['params']);
        route.params = of({token: 'test-token'});
        router = jasmine.createSpyObj('router', ['navigate', 'navigateByUrl']);
        authService = new AuthenticationServiceMock();
        matDialog = jasmine.createSpyObj('dialog', ['open']);
        breakpointObserver = jasmine.createSpyObj('breakpointObserver', ['observe']);
        snackbar = jasmine.createSpyObj('snackBar', ['openFromComponent']);
        fb = new FormBuilder();
        component = new ResetPasswordComponent(fb, breakpointObserver, route, authService, matDialog, router, snackbar);
    });

    it('should create a component', () => {
        expect(component).toBeTruthy();
    });

    it('route should include a token', () => {
        expect(component.token).not.toBeNull();
    });

    it('form should be invalid when passwords are different', () => {
        component.resetPasswordForm.controls['password'].setValue('12345678');
        component.resetPasswordForm.controls['confirmPassword'].setValue('123456789');

        expect(component.resetPasswordForm.status).toBe('INVALID');
    });

    it('passwords must at least have 8 characters', () => {
        component.resetPasswordForm.controls['password'].setValue('1234');
        expect(component.resetPasswordForm.controls['password'].hasError('minlength')).toBeTruthy();
    });

    it('passwords cannot be longer than 16 characters', () => {
        component.resetPasswordForm.controls['password'].setValue('123456789123456789');
        expect(component.resetPasswordForm.controls['password'].hasError('maxlength')).toBeTruthy();
    });

    it('passwords should only have numbers, A-z characters and the special charactes # !', () => {
        component.resetPasswordForm.controls['password'].setValue('ABC123#!');

        expect(component.resetPasswordForm.controls['password'].hasError('pattern')).toBeFalsy();
    });

    it('submit form function should call authService', () => {
        const resetPassword = spyOn(authService, 'resetPassword').and.returnValue(throwError('Error'));
        component.submitForm(component.resetPasswordForm);
        expect(resetPassword).toHaveBeenCalled();
    });

    it('submit form function should call authService', () => {
        const resetPassword = spyOn(authService, 'resetPassword').and.returnValue(throwError('Error'));
        component.submitForm(component.resetPasswordForm);
        expect(resetPassword).toHaveBeenCalled();
    });

    it('should not unsubscribe login before the login subscription', () => {
        component.ngOnDestroy();
        expect(component.resetPasswordSubscription).not.toBeDefined();
      });

      it('Input field functions should evaluate field and return (true or false) if 1 is passed.' +
    'If 0 is passed it should return the error message', () => {
        component.resetPasswordForm.controls['password'].markAsTouched();
        expect(component.getEmptyPasswordError(0)).toBeTruthy() ;
         let errorMessage = 'A palavra-passe não pode estar vazia.';
        expect(component.getEmptyPasswordError(1)).toBe(errorMessage);

        component.resetPasswordForm.controls['password'].setValue('ABC123#!^_-');
        expect(component.getInvalidCharactersPasswordError(0)).toBeTruthy() ;
        errorMessage = 'A sua palavra-passe contem caracteres inválidos.';
        expect(component.getInvalidCharactersPasswordError(1)).toBe(errorMessage);

        component.resetPasswordForm.controls['password'].setValue('321');
        expect(component.getMinLenghtPasswordError(0)).toBeTruthy() ;
        errorMessage = 'O tamanho mínimo da palavra-passe são 8 caracteres.';
        expect(component.getMinLenghtPasswordError(1)).toBe(errorMessage);

        component.resetPasswordForm.controls['password'].setValue('321231321321321321321');
        expect(component.getMaxLenghtPasswordError(0)).toBeTruthy() ;
        errorMessage = 'O tamanho maximo da palavra-passe são 16 caracteres.';
        expect(component.getMaxLenghtPasswordError(1)).toBe(errorMessage);
    });

});
