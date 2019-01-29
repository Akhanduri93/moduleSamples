import { UserSignupCatComponent } from './user-signup-cat.component';
import { SignupUser } from '../../../../shared/models/signupuser';
import { AccountServiceMock } from '../../../../core/mocks/account.service.mock';
import { SignupServiceMock } from '../../../../core/mocks/signup.service.mock';
import { fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Validators } from '@angular/forms';
import { SignupCategories } from '../../../../shared/models/signupcategories';

describe('SignupCatFormComponent', () => {
  let component: UserSignupCatComponent;
  let snackBar;
  let signupCat;
  let signupService;


  beforeEach(() => {
    signupCat = new AccountServiceMock();
    signupService = new SignupServiceMock();
    snackBar = jasmine.createSpyObj('snackBar', ['openFromComponent']);
    component = new UserSignupCatComponent(signupCat, signupService, snackBar);
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('ngoninit should initate call to get categories to be listed on the form', () => {
    spyOn(component, 'pullSignupCategories');
    component.ngOnInit();
    expect(component.pullSignupCategories).toHaveBeenCalled();
  });


  it('pullSignupCategories should initate call to set user categories and should set signupCats with pulled categories', fakeAsync(() => {
    component.user = new SignupUser();
    spyOn(component, 'setUserSubCategories');
    component.pullSignupCategories();
    tick();
    expect(component.signupCats.length).toBeGreaterThan(0);
    expect(component.setUserSubCategories).toHaveBeenCalled();
  }));

  it('setUserSubCategories should initate call to set category form and should set userSubCategories', fakeAsync(() => {
    component.user = new SignupUser();
    component.user = signupCat.testUser;
    spyOn(component, 'setSignupCatForm');
    component.setUserSubCategories();
    tick();
    expect(component.userSubCategories.length).toBeGreaterThan(0);
    expect(component.setSignupCatForm).toHaveBeenCalled();
  }));

  it('setSignupCatForm should initate call to set category form fields in the form and should set form fields', fakeAsync(() => {
    component.user = new SignupUser();
    component.user = signupCat.testUser;
    spyOn(component, 'setCategoryFormFields');
    component.setSignupCatForm();
    expect(component.userSignupCatForm.contains('cF')).toBeTruthy();
    // expect(component.userSignupCatForm.contains('description')).toBeTruthy();
    expect(component.userSignupCatForm.status).toBe('VALID');
    expect(component.setCategoryFormFields).toHaveBeenCalled();
  }));

  it('setCategoryFormFields should initiate call to pull user values and set category fields', fakeAsync(() => {
    component.user = new SignupUser();
    component.user = signupCat.testUser;
    spyOn(component, 'getUsersCategoryValueToSetT');
    spyOn(component, 'getUsersSubCategoryValueToSet');
    component.pullSignupCategories();
    tick();
    expect(component.categoryFields.length).toBeGreaterThan(0);
    expect(component.getUsersCategoryValueToSetT).toHaveBeenCalled();
    expect(component.getUsersSubCategoryValueToSet).toHaveBeenCalled();
  }));

  it('getUsersCategoryValueToSet should return true if user belongs to one of the categories', fakeAsync(() => {
    component.user = new SignupUser();
    component.user = signupCat.testUser;
    const catToSet = component.getUsersCategoryValueToSetT(signupCat.testUser.categories[0]);
    expect(catToSet).toBe(true);
  }));

  it('getUsersSubCategoryValueToSet should return true if user subcategory belongs to one of the categories', fakeAsync(() => {
    component.user = new SignupUser();
    component.user = signupCat.testUser;
    component.pullSignupCategories();
    tick();
    const catToSet = component.getUsersSubCategoryValueToSet(component.user.categories[1].subcategories[0]);
    expect(catToSet).toBe(true);
  }));

  it('setCategory should set selectedCats when category is set and should initiate call to set validators', fakeAsync(() => {
    spyOn(component, 'setValidatorForOther');
    spyOn(component, 'showIndustry');
    const selctedCats = component.selectedCats;
    component.user = new SignupUser();
    component.user = signupCat.testUser;
    component.pullSignupCategories();
    tick();
    component.categoryFields.controls['1'].controls['userCheck'].setValue(true);
    component.setCategory('1');
    expect(component.showIndustry).toHaveBeenCalled();
    component.categoryFields.controls['3'].controls['userCheck'].setValue(true);
    component.setCategory('3');
    expect(component.selectedCats).toBeGreaterThan(selctedCats);
    expect(component.setValidatorForOther).toHaveBeenCalled();
  }));

  it('setCategory should set selectedCats when category is un setted and should initiate call to clearValidatorForOther', fakeAsync(() => {
    spyOn(component, 'clearValidatorForOther');
    const selctedCats = component.selectedCats;
    component.user = new SignupUser();
    component.user = signupCat.testUser;
    component.pullSignupCategories();
    tick();
    component.categoryFields.controls['3'].controls['userCheck'].setValue(false);
    component.setCategory('3');
    expect(component.selectedCats).toBe(2);
    expect(component.clearValidatorForOther).toHaveBeenCalled();
  }));

  it('setCategory should initiate call to set subcategories to true when category is set to true', fakeAsync(() => {
    spyOn(component, 'checkSubCategories');
    component.user = new SignupUser();
    component.user = signupCat.testUser;
    component.user.categories[1] = new SignupCategories();
    component.pullSignupCategories();
    tick();
    component.categoryFields.controls['1'].controls['userCheck'].setValue(true);
    component.setCategory('1');
    expect(component.checkSubCategories).toHaveBeenCalled();
  }));

  it('setCategory should initiate call to unset subcategories to true when category is set to false', fakeAsync(() => {
    spyOn(component, 'unCheckSubCategories');
    component.user = new SignupUser();
    component.user = signupCat.testUser;
    component.user.categories[1] = new SignupCategories();
    component.pullSignupCategories();
    tick();
    component.categoryFields.controls['1'].controls['userCheck'].setValue(false);
    component.setCategory('1');
    expect(component.unCheckSubCategories).toHaveBeenCalled();
  }));

  it('setSubCategory should set selectedCats when sub category is setted', fakeAsync(() => {
    component.user = new SignupUser();
    component.user = signupCat.testUser;
    component.user.categories[1] = new SignupCategories();
    component.pullSignupCategories();
    tick();
    component.categoryFields.controls['1'].controls['subF'].controls['0'].controls['subCatCheck'].setValue(true);
    component.setSubCategory('0', '1');
    expect(component.selectedCats).toBe(3);
  }));

  it('setValidatorForOther should set validators for other category field', fakeAsync(() => {
    component.user = new SignupUser();
    component.user = signupCat.testUser;
    component.pullSignupCategories();
    tick();
    spyOn(component.categoryFields.controls['3'].controls['otherField'], 'setValidators');
    component.setValidatorForOther('3');
    expect(component.categoryFields.controls['3'].controls['otherField'].setValidators).toHaveBeenCalledWith([Validators.required]);
  }));

  it('setValidatorForOther should clear validators for other category field', fakeAsync(() => {
    component.user = new SignupUser();
    component.user = signupCat.testUser;
    component.pullSignupCategories();
    tick();
    spyOn(component.categoryFields.controls['3'].controls['otherField'], 'clearValidators');
    component.clearValidatorForOther('3');
    expect(component.categoryFields.controls['3'].controls['otherField'].clearValidators).toHaveBeenCalled();
  }));

  it('vendorRegisterCat when called with none of the category selected, should set showCatError', () => {
    spyOn(signupService, 'checkAlreadyPresentUser').and.callThrough();
    spyOn(component, 'registerUser');
    component.user = new SignupUser();
    component.user = signupCat.testUser;
    component.pullSignupCategories();
    component.selectedCats = 0;
    component.userRegisterCat(component.userSignupCatForm);
    expect(component.showCatError).toBe(true);
  });

  it('vendorRegisterCat when passed with correct data should initiate a call to check for existence of user and' +
    'also to register user if user does not exist', fakeAsync(() => {
      // spyOn(signupService, 'checkAlreadyPresentUser').and.callThrough();
      spyOn(component, 'registerUser').and.callThrough();
      component.user = new SignupUser();
      component.user = signupCat.testUser;
      component.pullSignupCategories();
      tick();
      component.userRegisterCat(component.userSignupCatForm);
      tick();
      // expect(signupService.checkAlreadyPresentUser).toHaveBeenCalled();
      expect(component.registerUser).toHaveBeenCalled();
    }));

  // it('vendorRegisterCat when passed with correct existing user data should initiate a call to snack bar ' +
  //   'to inform user about this', fakeAsync(() => {
  //     spyOn(signupService, 'checkAlreadyPresentUser').and.callThrough();
  //     spyOn(component, 'registerUser');
  //     component.user = new SignupUser();
  //     component.user = signupCat.testUser;
  //     component.user.email = 'test@test.com';
  //     component.pullSignupCategories();
  //     component.userRegisterCat(component.userSignupCatForm);
  //     tick();
  //     expect(signupService.checkAlreadyPresentUser).toHaveBeenCalled();
  //     expect(snackBar.openFromComponent).toHaveBeenCalled();
  //   }));

  // it('vendorRegisterCat when failed due to some exception, exception should be catched and' +
  //   ' call to snackbar should be initiated to inform this to user', fakeAsync(() => {
  //     spyOn(signupService, 'checkAlreadyPresentUser').and.returnValue(throwError('Error'));
  //     spyOn(component, 'registerUser');
  //     component.user = new SignupUser();
  //     component.user = signupCat.testUser;
  //     component.pullSignupCategories();
  //     component.userRegisterCat(component.userSignupCatForm);
  //     tick();
  //     expect(snackBar.openFromComponent).toHaveBeenCalled();
  //   }));

  it('registerUser when passed with correct data should initiate a call to snackbar  with success message ' +
    'also should initiate a call to navigate to login', fakeAsync(() => {
      spyOn(signupService, 'registerUser').and.callThrough();
      component.user = new SignupUser();
      component.user = signupCat.testUser;
      component.pullSignupCategories();
      tick();
      component.registerUser(component.user);
      tick();
      expect(signupService.registerUser).toHaveBeenCalled();
      expect(snackBar.openFromComponent).toHaveBeenCalled();
    }));

  it('registerUser if returned false due to some reasons ' +
    'should initiate a call to snack bar to inform user', fakeAsync(() => {
      spyOn(signupService, 'registerUser').and.returnValue(of(false));
      component.user = new SignupUser();
      component.user = signupCat.testUser;
      component.pullSignupCategories();
      tick();
      component.registerUser(component.user);
      tick();
      expect(snackBar.openFromComponent).toHaveBeenCalled();
    }));

  it('registerUser got failed due to some reasons ' +
    'should initiate a call to snack bar to inform user', fakeAsync(() => {
      spyOn(signupService, 'registerUser').and.returnValue(throwError('Error'));
      component.user = new SignupUser();
      component.user = signupCat.testUser;
      component.pullSignupCategories();
      tick();
      component.registerUser(component.user);
      tick();
      expect(snackBar.openFromComponent).toHaveBeenCalled();
    }));

  it('navigateBackToNifForm should initiate a call to goToBackToNif', () => {
    spyOn(component.goToBackToNif, 'emit');
    component.navigateBackToNifForm();
    expect(component.goToBackToNif.emit).toHaveBeenCalled();
  });

  it('showIndustry should set industry', () => {
    component.showIndustry('1');
    expect(component.industry).toBe('1');
  });

  it('hideIndustry should reset industry', () => {
    component.hideIndustry('1');
    expect(component.industry).toBe(false);
  });

  it('ngOnDestroy should unsubscribe all the subscription if any', () => {
    component.registerSubscription = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    component.existingUserSubscription = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    component.categoriesSubscription = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    component.ngOnDestroy();
    expect(component.registerSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.existingUserSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.categoriesSubscription.unsubscribe).toHaveBeenCalled();
  });
});
