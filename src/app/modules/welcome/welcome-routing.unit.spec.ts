import { welcomeRoutes } from './welcome-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { ResetPasswordComponent } from './pages//reset-password/reset-password.component';
import { PageNotFoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { UnavailableComponent } from './pages/unavailable/unavailable.component';
import { HelpCenterComponent } from '../portal/support/knowledge-base/help-center/help-center.component';

describe('WelcomeRoutes', () => {
  it('should contain a route for /login', () => {
    expect(welcomeRoutes).toContain({
      path: 'login',
      component: LoginComponent
    });
  });

  it('should contain a route for /recover-password', () => {
    expect(welcomeRoutes).toContain({
      path: 'recover-password',
      component: RecoverPasswordComponent
    });
  });

  it('should contain a route for /not-found', () => {
    expect(welcomeRoutes).toContain({
      path: 'not-found',
      component: PageNotFoundComponent
    });
  });

  it('should contain a route for /unavailable', () => {
    expect(welcomeRoutes).toContain({
      path: 'unavailable',
      component: UnavailableComponent
    });
  });

  it('should contain a route for /reset-password/:token', () => {
    expect(welcomeRoutes).toContain({
      path: 'reset-password/:token',
      component: ResetPasswordComponent
    });
  });

  // it('should contain a route for /help-center', () => {
  //   expect(welcomeRoutes).toContain({
  //     path: 'help-center',
  //     component: HelpCenterComponent
  //   });
  // });
});
