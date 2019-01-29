import { fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { SignupComponent } from './signup.component';
import { SignupServiceMock } from '../../../../core/mocks/signup.service.mock';
import { SignupUser } from '../../../../shared/models/signupuser';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let route;
  let signupService;
  let snackBar;
  let activeRoute: any;

  beforeEach(() => {
    route = jasmine.createSpyObj('route', ['navigateByUrl', 'snapshot']);
    activeRoute = {
      snapshot: {
        url: ['client', 'client']
      }
    };
    signupService = new SignupServiceMock();
    snackBar = jasmine.createSpyObj('snackBar', ['openFromComponent']);
    component = new SignupComponent(route, signupService, snackBar, activeRoute);
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('ngOninit should set the signupFor property', () => {
    component.ngOnInit();
    expect(component.signupFor).toBeDefined();
    expect(component.signupFor).toBe('client');
  });

  it('registerNifUser should set the signingUpUser signupProgress, and signupFor property', () => {
    let sUser = new SignupUser();
    sUser = signupService.users[0];
    sUser.type = 'client';

    component.registerNifUser(sUser);
    expect(component.signingUpUser).toBeDefined();
    expect(component.signupFor).toBe('user-nif');
    expect(component.signupProgress).toBe(99.99);
  });

  it('registerNifUser should set the signingUpUser signupProgress, and signupFor property', () => {
    let sUser = new SignupUser();
    sUser = signupService.users[0];
    sUser.type = 'vendor';

    component.registerNifUser(sUser);
    expect(component.signingUpUser).toBeDefined();
    expect(component.signupFor).toBe('user-nif');
    expect(component.signupProgress).toBe(66.66);
  });

  it('registerUser should set the signingUpUser property and should initiate call to doClientRegistration', () => {
    spyOn(component, 'doClientRegistration');
    let sUser = new SignupUser();
    sUser = signupService.users[0];
    sUser.type = 'client';

    component.registerUser(sUser);
    expect(component.signingUpUser).toBeDefined();
    expect(component.doClientRegistration).toHaveBeenCalled();
  });

  it('registerUser should set the signingUpUser, signupProgress and signupFor property', () => {
    let sUser = new SignupUser();
    sUser = signupService.users[0];
    sUser.type = 'vendor';

    component.registerUser(sUser);
    expect(component.signingUpUser).toBeDefined();
    expect(component.signupFor).toBe('user-cat');
    expect(component.signupProgress).toBe(99.99);
  });

  it('userRegistered should set the signingUpUser, signupProgress and should navigate to login', () => {
    let sUser = new SignupUser();
    sUser = signupService.users[0];
    sUser.type = 'vendor';

    component.userRegistered(sUser);
    expect(component.signingUpUser).toBeDefined();
    expect(component.signupProgress).toBe(99.99);
  });

  it('goToNifForm should set signupFor and signupProgress', () => {
    let sUser = new SignupUser();
    sUser = signupService.users[0];
    sUser.type = 'vendor';

    component.goToNifForm('');
    expect(component.signupFor).toBe('user-nif');
    expect(component.signupProgress).toBe(66.66);
  });

  it('goToSignUp should set signupFor and signupProgress', () => {
    let sUser = new SignupUser();
    sUser = signupService.users[0];
    sUser.type = 'vendor';

    component.goToSignUp('vendor');
    expect(component.signupFor).toBe('vendor');
    expect(component.signupProgress).toBe(33.33);
  });

  it('doClientRegistration when passed with correct existing user data should initiate a call to snack bar ' +
    'to inform user about this', fakeAsync(() => {
      spyOn(signupService, 'checkAlreadyPresentUser').and.callThrough();
      component.signingUpUser = new SignupUser();
      component.signingUpUser = signupService.users[0];
      component.signingUpUser.email = 'test@test.com';
      component.doClientRegistration();
      tick();
      expect(signupService.checkAlreadyPresentUser).toHaveBeenCalled();
      expect(snackBar.openFromComponent).toHaveBeenCalled();
    }));

  it('doClientRegistration when failed due to some exception, exception should be catched and' +
    ' call to snackbar should be initiated to inform this to user', fakeAsync(() => {
      spyOn(signupService, 'checkAlreadyPresentUser').and.returnValue(throwError('Error'));
      component.signingUpUser = new SignupUser();
      component.signingUpUser = signupService.users[0];
      component.signingUpUser.email = 'testing@test.com';
      component.doClientRegistration();
      tick();
      expect(snackBar.openFromComponent).toHaveBeenCalled();
    }));

  it('registerClient when passed with correct data should initiate a call to snackbar  with success message' +
    'also should initiate a call to navigate to login', fakeAsync(() => {
      spyOn(signupService, 'registerUser').and.callThrough();
      component.signingUpUser = new SignupUser();
      component.signingUpUser = signupService.users[0];
      component.signingUpUser.email = 'testing@test.com';
      component.registerClient(component.signingUpUser);
      tick();
      expect(signupService.registerUser).toHaveBeenCalled();
      expect(snackBar.openFromComponent).toHaveBeenCalled();
      expect(route.navigateByUrl).toHaveBeenCalled();
    }));

  it('registerClient if returned false due to some reasons ' +
    'should initiate a call to snack bar to inform user', fakeAsync(() => {
      spyOn(signupService, 'registerUser').and.returnValue(of(false));
      component.signingUpUser = new SignupUser();
      component.signingUpUser = signupService.users[0];
      component.signingUpUser.email = 'testing@test.com';
      component.registerClient(component.signingUpUser);
      tick();
      expect(snackBar.openFromComponent).toHaveBeenCalled();
    }));

  it('registerClient got failed due to some reasons ' +
    'should initiate a call to snack bar to inform user', fakeAsync(() => {
      spyOn(signupService, 'registerUser').and.returnValue(throwError('Error'));
      component.signingUpUser = new SignupUser();
      component.signingUpUser = signupService.users[0];
      component.signingUpUser.email = 'testing@test.com';
      component.registerClient(component.signingUpUser);
      tick();
      expect(snackBar.openFromComponent).toHaveBeenCalled();
    }));

  it('ngOnDestroy should unsubscribe all the subscription if any', () => {
    component.existingUserSubscription = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    component.registerSubscription = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    component.ngOnDestroy();
    expect(component.existingUserSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.registerSubscription.unsubscribe).toHaveBeenCalled();
  });
});
