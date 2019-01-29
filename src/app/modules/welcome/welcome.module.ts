import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './pages/login/login.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { WelcomeTextComponent } from './components/welcome-text/welcome-text.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ResetPasswordModalComponent } from './components/reset-password-modal/reset-password-modal.component';
import { PageNotFoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { NoIESupportComponent } from './pages/no-ie-support/no-ie-support.component';
import { UnavailableComponent } from './pages/unavailable/unavailable.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { UserSignupNifComponent } from './components/user-signup-nif/user-signup-nif.component';
import { UserSignupCatComponent } from './components/user-signup-cat/user-signup-cat.component';
import { SignupInfoTextComponent } from './components/signup-infotext/signup-infotext.component';
import { SignupVerifyComponent } from './components/user-signup/signup-verify-modal/signup-verify-modal.component';
import { VerificationServiceMock } from '../../core/mocks/verification.service.mock';
import { SignupServiceMock } from '../../core/mocks/signup.service.mock';
import { NifServiceMock } from '../../core/mocks/nif.service.mock';
import { AccountServiceMock } from '../../core/mocks/account.service.mock';
import { SignupCategoriesServiceMock } from '../../core/mocks/signupcategories.service.mock';
import { AuthenticationServiceMock } from '../../core/mocks/authentication.service.mock';
import { AuthenticationService } from '../../core/http/authentication.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignupService } from '../../core/http/signup.service';
import { AccountService } from '../../core/http/account.service';
import {
  MatFormFieldModule,
  MatIconModule,
  MatCheckboxModule,
  MatCardModule,
  MatDividerModule,
  MatToolbarModule,
  MatInputModule,
  MatButtonModule,
  MatDialogModule,
  MatSnackBarModule,
  MatRadioModule,
  MatProgressBarModule,
  MatExpansionModule,
  MatListModule,
  MatProgressSpinnerModule
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,

    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatRadioModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    UserSignupComponent,
    UserSignupNifComponent,
    UserSignupCatComponent,
    SignupInfoTextComponent,
    SignupVerifyComponent,
    RecoverPasswordComponent,
    ResetPasswordComponent,
    PageNotFoundComponent,
    UnavailableComponent,
    TermsConditionsComponent,
    WelcomeComponent,
    WelcomeTextComponent,
    ResetPasswordModalComponent,
    NoIESupportComponent
  ],
  providers: [
    AuthenticationService,
    VerificationServiceMock,
    SignupServiceMock,
    NifServiceMock,
    SignupCategoriesServiceMock,
    AuthenticationServiceMock,
    SignupService,
    AccountService,
    AccountServiceMock
  ],
  entryComponents: [
    ResetPasswordModalComponent,
    SignupVerifyComponent
  ]
})
export class WelcomeModule { }
