import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { PageNotFoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { UnavailableComponent } from './pages/unavailable/unavailable.component';
import { NoIESupportComponent } from './pages/no-ie-support/no-ie-support.component';
import { HelpCenterComponent } from '../portal/support/knowledge-base/help-center/help-center.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HelpCenterPortalAuthGuard } from '../../core/guards/helpcenterportal.auth.guard';

export const welcomeRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    redirectTo: 'signup/vendor'
  },
  {
    path: 'signup/vendor',
    component: SignupComponent
  },
  {
    path: 'recover-password',
    component: RecoverPasswordComponent
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent
  },
  {
    path: 'unavailable',
    component: UnavailableComponent
  },
  {
    path: 'no-ie-support',
    component: NoIESupportComponent
  },
  // {
  //   path: 'help-center',
  //   component: HelpCenterComponent,
  //   canActivate: [HelpCenterPortalAuthGuard]
  // },
];

@NgModule({
  imports: [
    RouterModule.forChild(welcomeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class WelcomeRoutingModule { }
