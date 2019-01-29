import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';

import { AuthenticationService } from '../../../../core/http/authentication.service';
import { Utils } from '../../../../shared/utils';
import { MatSnackBar } from '@angular/material';
import { AlertBarComponent } from '../../../../shared/components/alert-bar/alert-bar.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {

  returnUrl = '/';
  sessionSaved = false;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]);
  loginFormRxjs: FormGroup;
  email: FormControl;
  password: FormControl;
  hide = true;
  loginSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit() {
    this.authenticationService.logout();
    this.setLoginForm();
  }

  login(loginFormRxjs: FormGroup) {
    if (loginFormRxjs.valid) {
      loginFormRxjs.disable();
      this.loginSubscription = this.authenticationService.login(this.email.value, this.password.value, this.sessionSaved)
        .subscribe(
          data => {
            if (Utils.getInfoStorage('user') !== undefined) {
              // User authenticated

              // Redirect if the user has any Vendor Account
              const allAccounts = JSON.parse(Utils.getInfoStorage('accounts'));
              let hasVendorAccount = false;
              allAccounts.forEach(account => {
                if (account.isVendor) {
                  hasVendorAccount = true;
                }
              });

              if (hasVendorAccount) {
                // User has at least 1 Vendor Account
                window.location.href = Utils.getPartnerPortalUrl();
              } else {
                // User has only Customer Accounts
                this.router.navigate([this.returnUrl]);
              }
            }
          },
          error => {
            loginFormRxjs.enable();
            if (error.status === 0) {
              this.snackBar.openFromComponent(AlertBarComponent, {
                data: 'Serviço indisponível. Tente novamente mais tarde.',
                panelClass: 'error-snackbar'
              });
            } else {
              this.snackBar.openFromComponent(AlertBarComponent, {
                data: 'Email de utilizador ou palavra-passe inválidos. Por favor, verifique os dados introduzidos.',
                panelClass: 'error-snackbar'
              });
            }
          });
    }
  }

  //   .subscribe((currentUser: User) => {
  //     // Check if is first login with generate password
  //     if (currentUser.firstLoginWithPass === true) {
  //       // Redirect to create-password
  //       this.zone.run(() => this.router.navigate(['create-password']));
  //     } else {

  //       if (currentUser.accountType) {

  //         // if (currentUser.accountType === 'Channel Partner / Vendor') {
  //         //   // User is a Vendor
  //         //   this.zone.run(() => {
  //         //     if (window.location.hostname !== 'localhost') {
  //         //       window.location.href = '/?sessionToken=' + currentUser.sessionToken;
  //         //     } else {
  //         //       window.location.href = 'https://preprod-candor.cs86.force.com/?sessionToken=' + currentUser.sessionToken;
  //         //     }
  //         //   });
  //         //   // Delete sessionToken
  //         // } else if (currentUser.accountType === 'Customer - Channel') {
  //         //   // User is a Client
  //         //   this.zone.run(() => this.router.navigate([this.returnUrl]));
  //         // }

  //       } else {
  //         // User don't have permissions
  //         this.alertService.error('Sem permissões de acesso.');
  //         this.isLoading = false;
  //         this.ref.detectChanges();
  //       }
  //     }
  //   },
  //     err => {
  //       this.alertService.error('Erro de autenticação.', 'Tente novamente.');
  //       this.isLoading = false;
  //       this.ref.detectChanges();
  //     });
  // } else {
  //   this.isLoading = false;
  //   this.ref.detectChanges();
  // }
  // }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Email é obrigatório.' :
      this.email.hasError('email') ? 'Email inválido.' :
        '';
  }
  getPasswordErrorMessage() {
    return this.email.hasError('required') ? 'Password é obrigatória.' :
      '';
  }

  setLoginForm() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);

    this.loginFormRxjs = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
