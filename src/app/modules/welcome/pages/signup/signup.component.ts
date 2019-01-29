import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AlertBarComponent } from '../../../../shared/components/alert-bar/alert-bar.component';
import { SignupUser } from '../../../../shared/models/signupuser';
import { SignupServiceMock } from '../../../../core/mocks/signup.service.mock';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit, OnDestroy {

  sessionSaved = false;
  signupFor: string;
  signingUpUser: SignupUser;
  signupProgress = 0;
  existingUserSubscription: Subscription;
  registerSubscription: Subscription;

  constructor(
    private router: Router,
    private signupService: SignupServiceMock,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
    this.signingUpUser = new SignupUser();
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.url[1].toString() === 'vendor') {
      this.signupFor = 'vendor';
      this.signingUpUser.type = 'vendor';
    } else {
      if (this.activatedRoute.snapshot.url[1].toString() === 'client') {
        this.signupFor = 'client';
        this.signingUpUser.type = 'client';
      } else {
        this.router.navigateByUrl('/not-found');
      }
    }
    this.signupProgress = 33.33;
  }

  registerNifUser(user: SignupUser) {
    this.signingUpUser = user;
    this.signupFor = 'user-nif';
    if (this.signingUpUser.type === 'client') {
      this.signupProgress = 99.99;
    } else {
      this.signupProgress = 66.66;
    }
  }

  registerUser(user: SignupUser) {
    this.signingUpUser = user;
    if (this.signingUpUser.type === 'client') {
      this.doClientRegistration();
    } else {
      this.signupFor = 'user-cat';
      this.signupProgress = 99.99;
    }
  }

  userRegistered(user: SignupUser) {
    this.signingUpUser = user;
    this.signupProgress = 99.99;
    this.signupFor = 'user-sign-confirm';
  }

  goToNifForm(event: string) {
    this.signupFor = 'user-nif';
    this.signupProgress = 66.66;
  }

  goToSignUp(event: string) {
    this.signupFor = event;
    this.signupProgress = 33.33;
  }

  doClientRegistration() {
    this.existingUserSubscription = this.signupService.checkAlreadyPresentUser(this.signingUpUser).subscribe((result) => {
      if (result === false) {
        this.registerClient(this.signingUpUser);
      } else {
        this.snackBar.openFromComponent(AlertBarComponent, {
          data: 'Já existe um utilizador com este email.',
          panelClass: 'error-snackbar'
        });
      }
    }, (error) => {
      this.snackBar.openFromComponent(AlertBarComponent, {
        data: 'Ocurreu um erro. Por favor, tente novamente mais tarde.',
        panelClass: 'error-snackbar'
      });
    });
  }

  registerClient(account: SignupUser) {
    this.registerSubscription = this.signupService.registerUser(account).subscribe((signupResult) => {
      this.snackBar.openFromComponent(AlertBarComponent, {
        data: 'Registo efectuado com sucesso!',
        panelClass: 'success-snackbar'
      });
      this.router.navigateByUrl('/login');
    }, (error) => {
      this.snackBar.openFromComponent(AlertBarComponent, {
        data: 'Falha no registo, por favor tente novamente.',
        panelClass: 'error-snackbar'
      });
    });
  }

  ngOnDestroy() {
    if (this.existingUserSubscription) {
      this.existingUserSubscription.unsubscribe();
    }

    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }
}
