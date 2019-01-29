import { Component, OnInit, OnDestroy, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '../../../../../../node_modules/@angular/material';
import { AlertBarComponent } from '../../../../shared/components/alert-bar/alert-bar.component';
import { SignupUser } from '../../../../shared/models/signupuser';
import { SignupVerifyComponent } from './signup-verify-modal/signup-verify-modal.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { CustomValidators } from '../../../../shared/directives/custom-validators';
import { VerificationServiceMock } from '../../../../core/mocks/verification.service.mock';
import { SignupServiceMock } from '../../../../core/mocks/signup.service.mock';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../../../core/http/authentication.service';

@Component({
  moduleId: module.id,
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss'],
})

export class UserSignupComponent implements OnInit, OnDestroy {

  userSignupForm: FormGroup;
  @Input() user: SignupUser;
  @Output() verified = new EventEmitter();
  hide = true;
  verifySignupDailog: MatDialogRef<SignupVerifyComponent>;
  verifySignupDialogSub;
  verifySignupDialogCloseSub;
  userPresentSubscription: Subscription;
  sendVerificationC: Subscription;
  checkVerificationC: Subscription;
  userPresentError = false;
  enableSubmit = false;
  emailVerification = false;

  constructor(
    private verificationService: VerificationServiceMock,
    private signupService: SignupServiceMock,
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.setUserSignupForm();
  }

  setUserSignupForm() {
    this.userSignupForm = new FormGroup({
      nomeconta: new FormControl(this.user.fullaname ? this.user.fullaname : '',
        [
          Validators.required,
          CustomValidators.nameValidate('nomeconta'),
          CustomValidators.lastNameValidate('nomeconta')
        ]),
      tele: new FormControl(this.user.tele ? this.user.tele : '',
        [
          Validators.required,
          CustomValidators.phoneNoValidate('tele')
        ]),
      email: new FormControl(this.user.email ? this.user.email : '',
        [
          Validators.required,
          CustomValidators.validateEmail('email')
        ]),
      // password: new FormControl(this.user.pass ? this.user.pass : '',
      //   [
      //     Validators.required,
      //     Validators.pattern('([A-Za-z0-9!#]*)'),
      //     Validators.minLength(8),
      //     Validators.maxLength(16)
      //   ]),
      user: new FormControl(this.user.type ? this.user.type : 'vendor')
    });
  }

  userSignup(cSignupForm: FormGroup) {
    if (cSignupForm.valid) {
      const account: SignupUser = {
        email: cSignupForm.controls['email'].value,
        fullaname: cSignupForm.controls['nomeconta'].value,
        // pass: cSignupForm.controls['password'].value,
        tele: cSignupForm.controls['tele'].value,
        type: cSignupForm.controls['user'].value
      };
      this.userPresentSubscription = this.authenticationService.validateEmail(account.email).subscribe((result) => {
        if (result === true) {
          this.verified.emit(account);
          // this.sendVerificationCode(account);
        } else {
          this.snackBar.openFromComponent(AlertBarComponent, {
            data: 'Este email já existe.',
            panelClass: 'error-snackbar'
          });
        }
      }, (error) => {
        if (error.message) {
          this.snackBar.openFromComponent(AlertBarComponent, {
            data: 'Formato do email inválido.',
            panelClass: 'error-snackbar'
          });
        } else {
          this.snackBar.openFromComponent(AlertBarComponent, {
            data: 'Ocurreu um problema, por favor tente novamente.',
            panelClass: 'error-snackbar'
          });
        }
      });
    }
  }

  sendVerificationCode(account: SignupUser) {
    this.sendVerificationC = this.verificationService.sendVerificationCode(account.tele).subscribe((sendCodeResult) => {
      this.showVerificationModal(account);
    }, (error) => {
      this.snackBar.openFromComponent(AlertBarComponent, {
        data: 'Ocurreu um problema, por favor tente novamente.',
        panelClass: 'error-snackbar'
      });
    });
  }

  showVerificationModal(account: SignupUser) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = account;
    dialogConfig.width = '30rem';
    this.verifySignupDailog = this.dialog.open(SignupVerifyComponent, dialogConfig);
    this.verifySignupObserver();
  }

  verifySignupObserver() {
    if (this.verifySignupDailog !== undefined) {
      this.verifySignupDialogSub = this.verifySignupDailog.componentInstance.verifyNo.subscribe((verifyContact) => {
        this.verifyContact(verifyContact.code, verifyContact.data);
      });
      this.verifySignupDialogCloseSub = this.verifySignupDailog.afterClosed().subscribe(() => {
        this.verifySignupDialogSub.unsubscribe();
      });
    }
  }

  verifyContact(code: string, account: SignupUser) {
    this.checkVerificationC = this.verificationService.checkVerificationCode(code, account.tele).subscribe((result) => {
      if (result === true) {
        // this.registerUser(account);
        this.verifySignupDailog.close();
        this.verified.emit(account);
      } else {
        this.snackBar.openFromComponent(AlertBarComponent, {
          data: 'Verification failed, please submit correct code.',
          panelClass: 'error-snackbar'
        });
      }
    }, (error) => {
      this.snackBar.openFromComponent(AlertBarComponent, {
        data: 'There is some problem, please try again.',
        panelClass: 'error-snackbar'
      });
    });
  }

  checkIfExists() {
    this.enableSubmit = false;
    this.emailVerification = true;
    if (this.userSignupForm.controls['email'].status === 'VALID') {
      const account: SignupUser = new SignupUser();
      account.email = this.userSignupForm.controls['email'].value;
      this.userPresentSubscription = this.authenticationService.validateEmail(account.email).subscribe((result) => {
        this.emailVerification = false;
        if (result === false) {
          this.enableSubmit = false;
          this.userPresentError = true;
          this.userSignupForm.controls['email'].setErrors({ notUnique: true });
        } else {
          this.enableSubmit = true;
        }
      }, (error) => {
        this.enableSubmit = false;
        this.emailVerification = false;
        if (error.status === 400) {
          this.userSignupForm.controls['email'].setErrors({ email: true });
        }
        // this.snackBar.openFromComponent(AlertBarComponent, {
        //   data: 'There is some problem, please try again.',
        //   panelClass: 'error-snackbar'
        // });
      });
    } else {
      this.emailVerification = false;
    }

  }

  getNameErrorMessage() {
    return this.userSignupForm.controls['nomeconta'].hasError('required') ? 'Nome é obrigatório.' :
      this.userSignupForm.controls['nomeconta'].hasError('last-name') ? 'Primeiro e último nome obrigatórios.' :
        this.userSignupForm.controls['nomeconta'].hasError('invalid') ? 'Nome inválido.' :
          '';
  }

  getEmailErrorMessage() {
    return this.userSignupForm.controls['email'].hasError('required') ? 'Email é obrigatório.' :
      this.userSignupForm.controls['email'].hasError('invalid') ? 'Email inválido.' :
        this.userSignupForm.controls['email'].hasError('notUnique') ?
          'O email já está a ser utilizado por outra conta. Este contacto é seu? <a href="/login">Faça Login</a>' :
          '';
  }

  getTelephoneErrorMessage() {
    return this.userSignupForm.controls['tele'].hasError('required') ? 'Contacto telefónico é obrigatório.' :
      this.userSignupForm.controls['tele'].hasError('invalid') ? 'Contacto telefónico inválido.' :
        '';
  }

  // getEmptyPasswordError(message) {
  //   if (this.userSignupForm.controls['password'].touched &&
  //     this.userSignupForm.controls['password'].hasError('required') && message) {
  //     return 'A palavra-passe não pode estar vazia.';
  //   } else {
  //     return this.userSignupForm.controls['password'].touched &&
  //       this.userSignupForm.controls['password'].hasError('required');
  //   }
  // }

  // getInvalidCharactersPasswordError(message) {
  //   if (this.userSignupForm.controls['password'].touched &&
  //     this.userSignupForm.controls['password'].hasError('pattern') &&
  //     !this.userSignupForm.controls['password'].hasError('maxlength') &&
  //     !this.userSignupForm.controls['password'].hasError('minlength') && message) {
  //     return 'A sua palavra-passe contem caracteres inválidos.';
  //   } else {
  //     return this.userSignupForm.controls['password'].touched &&
  //       this.userSignupForm.controls['password'].hasError('pattern') &&
  //       !this.userSignupForm.controls['password'].hasError('maxlength') &&
  //       !this.userSignupForm.controls['password'].hasError('minlength');
  //   }
  // }

  // getMinLenghtPasswordError(message) {
  //   if (this.userSignupForm.controls['password'].touched &&
  //     this.userSignupForm.controls['password'].hasError('minlength') && message) {
  //     return 'O tamanho mínimo da palavra-passe são 8 caracteres.';
  //   } else {
  //     return this.userSignupForm.controls['password'].touched &&
  //       this.userSignupForm.controls['password'].hasError('minlength');
  //   }
  // }

  // getMaxLenghtPasswordError(message) {
  //   if (this.userSignupForm.controls['password'].touched &&
  //     this.userSignupForm.controls['password'].hasError('maxlength') && message) {
  //     return 'O tamanho maximo da palavra-passe são 16 caracteres.';
  //   } else {
  //     return this.userSignupForm.controls['password'].touched &&
  //       this.userSignupForm.controls['password'].hasError('maxlength');
  //   }
  // }

  ngOnDestroy() {
    if (this.verifySignupDialogSub !== undefined) {
      this.verifySignupDialogSub.unsubscribe();
    }

    if (this.verifySignupDialogCloseSub !== undefined) {
      this.verifySignupDialogCloseSub.unsubscribe();
    }

    if (this.userPresentSubscription) {
      this.userPresentSubscription.unsubscribe();
    }

    if (this.sendVerificationC) {
      this.sendVerificationC.unsubscribe();
    }

    if (this.checkVerificationC) {
      this.checkVerificationC.unsubscribe();
    }
  }
}
