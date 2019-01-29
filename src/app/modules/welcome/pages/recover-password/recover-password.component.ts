import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../core/http/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { BreakpointState, Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material';
import { AlertBarComponent } from '../../../../shared/components/alert-bar/alert-bar.component';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit, OnDestroy {

  recovered = false;
  recoverPassRxjs: FormGroup;
  email: FormControl;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]);
  authServiceSub: Subscription;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.setRecoverPasswordForm();
  }

  resendPassword() {
    this.authServiceSub = this.authenticationService.recoverPassword(this.email.value).subscribe(
      () => {
        this.recovered = true;
      },
      (err) => {
        this.snackBar.openFromComponent(AlertBarComponent, {data: 'Falha no pedido de recuperação de password.',
        panelClass: 'error-snackbar'});
      });
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Email é obrigatório.' :
      this.email.hasError('email') ? 'Email inválido.' :
        '';
  }
  setRecoverPasswordForm() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.recoverPassRxjs = new FormGroup({
      email: this.email,
    });
  }
  navigateBack() {
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy() {
    if (this.authServiceSub) {
      this.authServiceSub.unsubscribe();
    }
  }

}
