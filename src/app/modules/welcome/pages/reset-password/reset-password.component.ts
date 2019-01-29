import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { ResetPasswordModalComponent } from '../../components/reset-password-modal/reset-password-modal.component';
import { AuthenticationService } from '../../../../core/http/authentication.service';
import { AlertBarComponent } from '../../../../shared/components/alert-bar/alert-bar.component';
import { CustomValidators } from '../../../../shared/directives/custom-validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  resetPasswordForm: FormGroup;
  password = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16),
  Validators.pattern('([A-Za-z0-9!#]*)')]);
  confirmPassword = new FormControl('', [Validators.required]);
  hide = true;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]);
  token;
  resetPasswordSubscription: Subscription;
  dialogRef: MatDialogRef<ResetPasswordModalComponent>;
  dialogSub: Subscription;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.token = params['token'];
    });
  }

  constructor(private fb: FormBuilder, private breakpointObserver: BreakpointObserver, private route: ActivatedRoute,
    private authService: AuthenticationService, private dialog: MatDialog,
    private router: Router, private snackBar: MatSnackBar) {
    this.resetPasswordForm = this.fb.group({
      password: this.password,
      confirmPassword: this.confirmPassword,
    },
      {
        validator: CustomValidators.passwordMatchValidator('password', 'confirmPassword')
      }
    );
  }

  submitForm(resetPasswordForm: AbstractControl) {
    this.resetPasswordSubscription = this.authService.resetPassword(this.token, resetPasswordForm.get('confirmPassword').value).subscribe(
      () => {
        this.dialogRef = this.dialog.open(ResetPasswordModalComponent, {
          disableClose: true
        });
        this.dialogSub = this.dialogRef.afterClosed().subscribe(() => {
          this.router.navigate(['/login']);
        });
      },
      (err) => {
        this.snackBar.openFromComponent(AlertBarComponent, {
          data: 'Falha no pedido de alteração da palavra-passe.',
          panelClass: 'error-snackbar'
        });
      });
  }

  getEmptyPasswordError(message) {
    if (this.resetPasswordForm.controls['password'].touched &&
      this.resetPasswordForm.controls['password'].hasError('required') && message) {
      return 'A palavra-passe não pode estar vazia.';
    } else {
      return this.resetPasswordForm.controls['password'].touched &&
        this.resetPasswordForm.controls['password'].hasError('required');
    }
  }

  getInvalidCharactersPasswordError(message) {
    if (this.resetPasswordForm.controls['password'].touched &&
      this.resetPasswordForm.controls['password'].hasError('pattern') &&
      !this.resetPasswordForm.controls['password'].hasError('maxlength') &&
      !this.resetPasswordForm.controls['password'].hasError('minlength') && message) {
      return 'A sua palavra-passe contem caracteres inválidos.';
    } else {
      return this.resetPasswordForm.controls['password'].touched &&
        this.resetPasswordForm.controls['password'].hasError('pattern') &&
        !this.resetPasswordForm.controls['password'].hasError('maxlength') &&
        !this.resetPasswordForm.controls['password'].hasError('minlength');
    }
  }

  getMinLenghtPasswordError(message) {
    if (this.resetPasswordForm.controls['password'].touched &&
      this.resetPasswordForm.controls['password'].hasError('minlength') && message) {
      return 'O tamanho mínimo da palavra-passe são 8 caracteres.';
    } else {
      return this.resetPasswordForm.controls['password'].touched &&
        this.resetPasswordForm.controls['password'].hasError('minlength');
    }
  }

  getMaxLenghtPasswordError(message) {
    if (this.resetPasswordForm.controls['password'].touched &&
      this.resetPasswordForm.controls['password'].hasError('maxlength') && message) {
      return 'O tamanho maximo da palavra-passe são 16 caracteres.';
    } else {
      return this.resetPasswordForm.controls['password'].touched &&
        this.resetPasswordForm.controls['password'].hasError('maxlength');
    }
  }

  ngOnDestroy() {
    if (this.resetPasswordSubscription) {
      this.resetPasswordSubscription.unsubscribe();
    }
    if (this.dialogSub) {
      this.dialogSub.unsubscribe();
    }
  }

  get matDialog(): MatDialog {
    return this.dialog;
  }

}
