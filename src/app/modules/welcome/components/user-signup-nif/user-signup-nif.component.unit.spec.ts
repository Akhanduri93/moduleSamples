import { UserSignupNifComponent } from './user-signup-nif.component';
import { SignupUser } from '../../../../shared/models/signupuser';
import { fakeAsync, tick } from '@angular/core/testing';
import { Nif, NifAttachment } from '../../../../shared/models/nif';
import { Validators, FormArray, FormGroup } from '@angular/forms';
import { SignupServiceMock } from '../../../../core/mocks/signup.service.mock';
import { AuthenticationServiceMock } from '../../../../core/mocks/authentication.service.mock';
import { CustomValidators } from '../../../../shared/directives/custom-validators';

describe('NifFormSignupComponent', () => {
  let component: UserSignupNifComponent;
  let nifService;
  let authenticationService;
  let snackBar;
  const attachment = new NifAttachment('Title', 'image');

  beforeEach(() => {
    nifService = new SignupServiceMock();
    authenticationService = new AuthenticationServiceMock();
    snackBar = jasmine.createSpyObj('snackBar', ['openFromComponent']);
    component = new UserSignupNifComponent(nifService, authenticationService, snackBar);
    component.user = new SignupUser();
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('ngoninit should initate call to setUserSignupNifForm', () => {
    spyOn(component, 'setUserSignupNifForm');
    spyOn(component, 'updateCurrentNifDetails');
    component.ngOnInit();
    expect(component.setUserSignupNifForm).toHaveBeenCalled();
  });

  it('updateCurrentNifDetails should use existing nif value and should initiate a call to pull nif detail', () => {
    component.user = nifService.testUser;
    component.setUserSignupNifForm();
    spyOn(component, 'getDetailsFromNif');
    component.updateCurrentNifDetails();
    expect(component.getDetailsFromNif).toHaveBeenCalled();
  });

  it('setUserSignupNifForm should set a form', () => {
    component.user = new SignupUser();
    component.setUserSignupNifForm();
    expect(component.userSignupNifForm.contains('nome')).not.toBeNull();
    expect(component.userSignupNifForm.contains('nif')).toBeTruthy();
    expect(component.userSignupNifForm.contains('address')).toBeTruthy();
    expect(component.userSignupNifForm.contains('postalCode')).toBeTruthy();
    expect(component.userSignupNifForm.contains('city')).toBeTruthy();
    expect(component.userSignupNifForm.contains('power')).toBeTruthy();
    expect(component.userSignupNifForm.contains('forceName')).toBeTruthy();
    expect(component.userSignupNifForm.contains('forceEmail')).toBeTruthy();
    expect(component.userSignupNifForm.status).toBe('INVALID');
  });

  it('setNifFormYear should set ano years', () => {
    const dObj = new Date();
    const currentYear = dObj.getFullYear();
    component.setNifFormYear();
    expect(component.ano.length).toBe(3);
    expect(component.ano[0]).toBe(currentYear.toString());
    expect(component.ano[1]).toBe((currentYear - 1).toString());
    expect(component.ano[2]).toBe((currentYear - 2).toString());
  });

  it('getDetailsFromNif should initate call to pull details of company and on recieving should initiate a call to set ' +
    'the nif fields', fakeAsync(() => {
      const nif = nifService.parseNif(nifService.nifs[0]);
      spyOn(nifService, 'validate').and.callThrough();
      spyOn(component, 'updateNifFormFieldsWithNifDetail');
      component.user = new SignupUser();
      component.setUserSignupNifForm();
      component.userSignupNifForm.controls['nif'].setValue(nif.nif);
      component.getDetailsFromNif();
      tick();
      expect(nifService.validate).toHaveBeenCalled();
      expect(component.updateNifFormFieldsWithNifDetail).toHaveBeenCalled();
    }));

  it('updateNifFormFieldsWithNifDetail should set the recieved values to form fields correctly ' +
    'and should initiate a call to set nif contacts and set powerfield', fakeAsync(() => {
      const nif = nifService.parseNif(nifService.nifs[0]);
      spyOn(component, 'prepareContactListForTemplate').and.callThrough();
      spyOn(component, 'setContact').and.callThrough();
      component.setUserSignupNifForm();
      component.updateNifFormFieldsWithNifDetail(nif);
      expect(component.userSignupNifForm.controls['address'].value).toBe(nifService.nifs[0]['address']);
      expect(component.userSignupNifForm.controls['postalCode'].value).toBe(nifService.nifs[0]['postalcode']);
      expect(component.userSignupNifForm.controls['city'].value).toBe(nifService.nifs[0]['city']);
      expect(component.prepareContactListForTemplate).toHaveBeenCalled();
      expect(component.setContact).toHaveBeenCalled();
    }));

  it('prepareContactListForTemplate should set nifContacts and should initiate a call to set outro', fakeAsync(() => {
    const nif = nifService.parseNif(nifService.nifs[0]);
    spyOn(component, 'prepareOutroInTemplateContactList').and.callThrough();
    component.user = new SignupUser();
    component.setUserSignupNifForm();
    component.updateNifFormFieldsWithNifDetail(nif);
    expect(component.nifContacts.length).toBe(7);
    expect(component.prepareOutroInTemplateContactList).toHaveBeenCalled();
  }));

  it('prepareOutroInTemplateContactList should either add or remove outro from the contact list', fakeAsync(() => {
    const nif = nifService.parseNif(nifService.nifs[0]);
    component.user = new SignupUser();
    component.setUserSignupNifForm();
    component.updateNifFormFieldsWithNifDetail(nif);
    component.prepareOutroInTemplateContactList(true);
    const outroIndex = component.nifContacts.findIndex(contact => contact.name === 'Nenhum dos perfis acima');
    expect(outroIndex).toBeGreaterThanOrEqual(0);
  }));

  it('markContactForSubmission should initiate a call to set power field values', fakeAsync(() => {
    const nif = nifService.parseNif(nifService.nifs[0]);
    spyOn(component, 'updateNifForm');
    const index = '0';
    component.user = new SignupUser();
    component.setUserSignupNifForm();
    component.updateNifFormFieldsWithNifDetail(nif);
    component.markContactForSubmission(index);
    expect(component.nifContacts[index].showField).toBe(true);
    expect(component.updateNifForm).toHaveBeenCalled();
  }));

  it('updateNifForm should set expected value in form power fields', fakeAsync(() => {
    const nif = nifService.parseNif(nifService.nifs[0]);
    const index = 0;
    component.user = new SignupUser();
    component.setUserSignupNifForm();
    component.updateNifFormFieldsWithNifDetail(nif);
    component.userSignupNifForm.controls['power'].setValue('Não');
    component.markContactForSubmission(index);
    expect(component.userSignupNifForm.controls['forceName'].value).toBe(component.nifContacts[0].name);
  }));

  it('updateContactCargoInNifForm should set expected value in form power cargo field of the form', fakeAsync(() => {
    const setCargoText = 'Director';
    component.setUserSignupNifForm();
    component.updateContactCargoInNifForm('0', setCargoText);
    expect(component.userSignupNifForm.controls['forceCargo'].value).toBe(setCargoText);
  }));

  it('updateContactEmailInNifForm should set expected value in form power email field of the form', fakeAsync(() => {
    const nif = nifService.parseNif(nifService.nifs[0]);
    spyOn(authenticationService, 'validateEmail').and.callThrough();
    const setEmailText = 'abc@abc.com';
    component.setUserSignupNifForm();
    component.updateNifFormFieldsWithNifDetail(nif);
    component.updateContactEmailInNifForm('0', setEmailText);
    tick();
    expect(authenticationService.validateEmail).toHaveBeenCalled();
    expect(component.userSignupNifForm.controls['forceEmail'].value).toBe(setEmailText);
  }));

  it('updatePowerFieldToSetContactListOnTemplate should set reset the power fields question', () => {
    spyOn(component, 'setBaseForceFields');
    component.user = new SignupUser();
    component.setUserSignupNifForm();
    component.updatePowerFieldToSetContactListOnTemplate('Sim');
    expect(component.setBaseForceFields).toHaveBeenCalled();
  });

  it('vendorRegisterNif should emit the nif values when vendorSignupNifForm is valid', () => {
    spyOn(component.nifRegistered, 'emit');
    component.user = new SignupUser();
    component.setUserSignupNifForm();
    const nif: Nif = nifService.parseNif(nifService.nifs[0]);
    component.userSignupNifForm.controls['nif'].setValue(nif.nif);
    component.userSignupNifForm.controls['postalCode'].setValue(nif.postalCode);
    component.updateNifFormFieldsWithNifDetail(nif);
    component.userSignupNifForm.controls['power'].setValue('Sim');
    component.markContactForSubmission(0);
    component.userSignupNifForm.controls['forceName'].setValue('Test');
    component.userSignupNifForm.controls['forceCargo'].setValue('Test');
    component.userSignupNifForm.controls['forceEmail'].setValue('Test@test.com');
    const usersUpdatedFields = <FormArray>component.userSignupNifForm.controls['cF'];
    const iUserField = <FormGroup>usersUpdatedFields.controls[0];
    iUserField.controls['userCargo'].setValue('Test');
    iUserField.controls['userEmail'].setValue('Test@test.com');
    iUserField.controls['userName'].setValue('Test');
    component.userRegisterNif(component.userSignupNifForm);
    expect(component.nifRegistered.emit).toHaveBeenCalled();
  });

  it('navigateBackToSignUpForm should initiate a call to goToBackToSignUpForm', () => {
    spyOn(component.goToBackToSignUpForm, 'emit');
    component.navigateBackToSignUpForm();
    expect(component.goToBackToSignUpForm.emit).toHaveBeenCalled();
  });

  it('checkNifNull should return true when nif is not set', () => {
    const nifObj = new Nif();
    const isNifNull = component.checkNifNull(nifObj);
    expect(isNifNull).toBe(true);
  });

  it('ngOnDestroy should unsubscribe all the subscription if any', () => {
    component.nifDetailSubscription = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    component.ngOnDestroy();
    expect(component.nifDetailSubscription.unsubscribe).toHaveBeenCalled();
  });

  it('getCNameErrorMessage should return correct message when name not provided', () => {
    const nif: Nif = nifService.parseNif(nifService.nifs[0]);
    component.user = new SignupUser();
    component.setUserSignupNifForm();
    component.userSignupNifForm.controls['nome'].enable();
    component.userSignupNifForm.controls['nome'].setValue('');
    expect(component.getCNameErrorMessage()).toBe('Nome é obrigatório.');
  });

  it('getNifErrorMessage should return correct message when nif not provided', () => {
    const nif: Nif = nifService.parseNif(nifService.nifs[0]);
    component.user = new SignupUser();
    component.setUserSignupNifForm();
    component.updateNifFormFieldsWithNifDetail(nif);

    component.userSignupNifForm.controls['nif'].setValue('');
    component.userSignupNifForm.clearAsyncValidators();
    component.userSignupNifForm.clearValidators();
    component.userSignupNifForm.updateValueAndValidity();
    expect(component.getNifErrorMessage()).toBe('NIF é obrigatório.');
  });

  it('getNifErrorMessage should return correct message when nif not provided in correct format', () => {
    const nif: Nif = nifService.parseNif(nifService.nifs[0]);
    component.user = new SignupUser();
    component.setUserSignupNifForm();
    component.updateNifFormFieldsWithNifDetail(nif);

    component.userSignupNifForm.controls['nif'].setValue('12');
    component.userSignupNifForm.clearAsyncValidators();
    component.userSignupNifForm.clearValidators();
    component.userSignupNifForm.updateValueAndValidity();
    expect(component.getNifErrorMessage()).toBe('NIF inválido.');
  });


  it('getAddressErrorMessage should return correct message when address not provided', () => {
    const nif: Nif = nifService.parseNif(nifService.nifs[0]);
    component.user = new SignupUser();
    component.setUserSignupNifForm();
    component.updateNifFormFieldsWithNifDetail(nif);

    component.userSignupNifForm.controls['address'].setValue('');
    component.userSignupNifForm.clearAsyncValidators();
    component.userSignupNifForm.clearValidators();
    component.userSignupNifForm.updateValueAndValidity();
    expect(component.getAddressErrorMessage()).toBe('Rua, Número, Andar… é obrigatório.');
  });

  it('getPostalCodeErrorMessage should return correct message when postal code not provided', () => {
    component.user = new SignupUser();
    component.setUserSignupNifForm();
    component.userSignupNifForm.controls['postalCode'].setValue('');
    component.userSignupNifForm.updateValueAndValidity();

    expect(component.getPostalCodeErrorMessage()).toBe('Código Postal é obrigatório.');
  });

  it('getPostalCodeErrorMessage should return correct message when nif not provided in correct format', () => {
    component.user = new SignupUser();
    component.setUserSignupNifForm();

    component.userSignupNifForm.controls['postalCode'].setValue('123');
    component.userSignupNifForm.updateValueAndValidity();
    expect(component.getPostalCodeErrorMessage()).toBe('Código Postal inválido.');
  });

  it('getCityErrorMessage should return correct message when city not provided', () => {
    const nif: Nif = nifService.parseNif(nifService.nifs[0]);
    component.user = new SignupUser();
    component.setUserSignupNifForm();
    component.updateNifFormFieldsWithNifDetail(nif);

    component.userSignupNifForm.controls['city'].setValue('');
    component.userSignupNifForm.clearAsyncValidators();
    component.userSignupNifForm.clearValidators();
    component.userSignupNifForm.updateValueAndValidity();
    expect(component.getCityErrorMessage()).toBe('Cidade é obrigatória.');
  });

  it('getForceNameErrorMessage should return correct message when name not provided', () => {
    const nif: Nif = nifService.parseNif(nifService.nifs[0]);
    component.user = new SignupUser();
    component.setUserSignupNifForm();
    component.userSignupNifForm.controls['forceName'].setValidators([Validators.required]);
    component.userSignupNifForm.controls['nif'].setValue(nif.nif);
    component.updateNifFormFieldsWithNifDetail(nif);

    component.userSignupNifForm.controls['forceName'].setValue('');
    component.userSignupNifForm.updateValueAndValidity();
    expect(component.getForceNameErrorMessage()).toBe('Nome é obrigatório.');
  });

  it('getForceEmailErrorMessage should return correct message when email not provided in correct format', () => {
    const nif: Nif = nifService.parseNif(nifService.nifs[0]);
    component.user = new SignupUser();
    component.setUserSignupNifForm();
    component.updateNifFormFieldsWithNifDetail(nif);
    component.userSignupNifForm.controls['forceEmail'].setValidators(CustomValidators.validateEmail('forceEmail'));
    component.userSignupNifForm.controls['forceEmail'].setValue('123');
    component.userSignupNifForm.updateValueAndValidity();
    expect(component.getForceEmailErrorMessage()).toBe('Email inválido.');
  });

  it('setNifFields should set the field with passed parameter', () => {
    const nif: Nif = nifService.parseNif(nifService.nifs[0]);
    component.user = new SignupUser();
    component.setUserSignupNifForm();
    component.setNifFields('nif', '111111111');
    expect(component.userSignupNifForm.controls['nif'].value).toBe('111111111');
    component.setNifFields('nome', '111111111', true);
    expect(component.userSignupNifForm.controls['nome'].enabled).toBe(true);
    component.setNifFields('nif', '111111111', null, CustomValidators.validateEmail('nif'));
    component.userSignupNifForm.controls['nif'].setValue('aa@aa.com');
    component.userSignupNifForm.controls['nif'].updateValueAndValidity();
    expect(component.userSignupNifForm.controls['nif'].status).toBe('VALID');
    component.userSignupNifForm.controls['nif'].setValue('a');
    component.userSignupNifForm.controls['nif'].updateValueAndValidity();
    expect(component.userSignupNifForm.controls['nif'].status).toBe('INVALID');
    component.setNifFields('nif', '111111111', null, null, true);
    expect(component.userSignupNifForm.controls['nif'].disabled).toBe(true);
    component.setNifFields('nif', '111111111', true, null, null, true);
    component.userSignupNifForm.controls['nif'].setValue('a');
    component.userSignupNifForm.controls['nif'].updateValueAndValidity();
    expect(component.userSignupNifForm.controls['nif'].status).toBe('VALID');

  });

  it('setBaseForceFields should set force field values correctly', () => {
    const nif: Nif = nifService.parseNif(nifService.nifs[0]);
    component.user = new SignupUser();
    component.user.fullaname = 'Santino Marella';
    component.user.cargo = 'Test';
    component.user.email = 'test@test.com';
    component.user.powerEmail = 'testnew@testnew.com';
    component.user.powerName = 'Carlos Moya';
    component.setUserSignupNifForm();
    component.setBaseForceFields('Sim');
    expect(component.userSignupNifForm.controls['forceName'].value).toBe(component.user.fullaname);
    expect(component.userSignupNifForm.controls['forceCargo'].value).toBe(component.user.cargo);
    expect(component.userSignupNifForm.controls['forceEmail'].value).toBe(component.user.email);
    component.setBaseForceFields('Nao');
    expect(component.userSignupNifForm.controls['forceName'].value).toBe(component.user.powerName);
    expect(component.userSignupNifForm.controls['forceCargo'].value).toBe(component.user.cargo);
    expect(component.userSignupNifForm.controls['forceEmail'].value).toBe(component.user.powerEmail);
  });

  it('attachmentFields should set and clear validators as per paratemter passes', () => {
    const nif: Nif = nifService.parseNif(nifService.nifs[0]);
    component.user = new SignupUser();
    component.user.fullaname = 'Santino Marella';
    component.user.cargo = 'Test';
    component.user.email = 'test@test.com';
    component.user.powerEmail = 'testnew@testnew.com';
    component.user.powerName = 'Carlos Moya';
    component.setUserSignupNifForm();
    component.attachmentFields(true);
    component.userSignupNifForm.controls['ano'].setValue('');
    component.userSignupNifForm.controls['ano'].updateValueAndValidity();
    expect(component.userSignupNifForm.controls['ano'].status).toBe('INVALID');
    component.attachmentFields(false);
    component.userSignupNifForm.controls['ano'].setValue('');
    component.userSignupNifForm.controls['ano'].updateValueAndValidity();
    expect(component.userSignupNifForm.controls['ano'].status).toBe('VALID');
  });

  it('setContact should initiate call to mark contact from the contact list', () => {
    spyOn(component, 'markContactForSubmission');
    const nif: Nif = nifService.parseNif(nifService.nifs[0]);
    component.user = new SignupUser();
    component.setUserSignupNifForm();
    component.updateNifFormFieldsWithNifDetail(nif);
    component.userSignupNifForm.controls['chosenContact'].setValue(component.nifContacts[0].radioValue);
    component.updatePowerFieldToSetContactListOnTemplate('Sim');
    expect(component.markContactForSubmission).toHaveBeenCalled();
  });

  it('setContactFieldProperties enable disable or set validators with respect to contact set configuration', () => {
    spyOn(component, 'enableContactFieldValidator');
    spyOn(component, 'disableContactField');
    const nif: Nif = nifService.parseNif(nifService.nifs[0]);
    component.user = new SignupUser();
    component.setUserSignupNifForm();
    component.updateNifFormFieldsWithNifDetail(nif);
    component.setContactFieldProperties(0);
    expect(component.enableContactFieldValidator).toHaveBeenCalled();
    expect(component.disableContactField).toHaveBeenCalled();
  });

  it('enableContactFieldValidator should set validator on contact field', () => {
    const nif: Nif = nifService.parseNif(nifService.nifs[0]);
    component.user = new SignupUser();
    component.setUserSignupNifForm();
    component.updateNifFormFieldsWithNifDetail(nif);
    const usersUpdatedFields = <FormArray>component.userSignupNifForm.controls['cF'];
    const userField = <FormGroup>usersUpdatedFields.controls[0];
    userField.controls['userName'].enable();
    userField.controls['userName'].updateValueAndValidity();
    component.enableContactFieldValidator('userName', 0, [CustomValidators.validateEmail('userName')]);
    userField.controls['userName'].setValue('a');
    userField.controls['userName'].updateValueAndValidity();
    expect(userField.controls['userName'].status).toBe('INVALID');
  });

  it('disableContactField should set disable on contact field', () => {
    const nif: Nif = nifService.parseNif(nifService.nifs[0]);
    component.user = new SignupUser();
    component.setUserSignupNifForm();
    component.updateNifFormFieldsWithNifDetail(nif);
    component.disableContactField('userCargo', 0, true);
    const usersUpdatedFields = <FormArray>component.userSignupNifForm.controls['cF'];
    const userField = <FormGroup>usersUpdatedFields.controls[0];
    expect(userField.controls['userCargo'].disabled).toBe(true);
  });

  it('setContFieldOnError should set set error on contact field', () => {

    const nif: Nif = nifService.parseNif(nifService.nifs[0]);
    component.user = new SignupUser();
    component.setUserSignupNifForm();
    component.updateNifFormFieldsWithNifDetail(nif);
    component.setContFieldOnError('userEmail', 0, { notUnique: true });
    const usersUpdatedFields = <FormArray>component.userSignupNifForm.controls['cF'];
    const userField = <FormGroup>usersUpdatedFields.controls[0];

    expect(userField.controls['userEmail'].status).toBe('INVALID');
  });

  it('checkIfExists when passed with correct data should initiate a call' +
    'also should initiate a call to navigate to login', fakeAsync(() => {
      component.user = new SignupUser();
      component.setUserSignupNifForm();
      component.userSignupNifForm.controls['forceEmail'].setValue('test@test.com');
      component.checkIfExists();
      tick();
      expect(component.userSignupNifForm.controls['forceEmail'].status).toBe('INVALID');
    }));

  it('when addFile is called with no files, should not call the setupReader', () => {
    const spySetupReader = spyOn(component, 'setupReader');
    const event = { target: { files: {} } };
    component.addFile(event);
    expect(component.attachments.length).toBe(0);
    expect(spySetupReader).not.toHaveBeenCalled();
  });

  it('when addFile is called with 2 files, should call twice the setupReader', () => {
    const spySetupReader = spyOn(component, 'setupReader');
    const event = { target: { files: [undefined, undefined] } };
    component.addFile(event);
    expect(component.attachments.length).toBe(0);
    expect(spySetupReader).toHaveBeenCalledTimes(2);
  });

  it('when addFile is called with an undefined file, should return 0', () => {
    const spySetupReader = spyOn(component, 'setupReader').and.callThrough();
    const event = { target: { files: [undefined] } };
    component.addFile(event);
    expect(component.attachments.length).toBe(0);
    expect(spySetupReader).toHaveBeenCalled();
  });
  it('when addFile is called with an invalid type of file passed fileValid should be 0', () => {
    const spySetupReader = spyOn(component, 'setupReader').and.callThrough();
    const event = { target: { files: [{ name: 'test.pdf', size: 632480, type: 'application/text' }] } };
    component.addFile(event);
    expect(component.attachments.length).toBe(0);
    expect(spySetupReader).toHaveBeenCalled();
  });

  it('when addFile is called with a file size greater than 5mb fileValid should be 0', () => {
    const spySetupReader = spyOn(component, 'setupReader').and.callThrough();
    const event = { target: { files: [{ name: 'test.pdf', size: 6324800, type: 'application/pdf' }] } };
    component.addFile(event);
    expect(component.attachments.length).toBe(0);
    expect(spySetupReader).toHaveBeenCalled();
  });

  it('when pushToAttachments is called it should add a new attachment to the array.', () => {
    component.pushtoAttachments(attachment);
    expect(component.attachments.length).toBe(1);
  });
  it('when remove file is called should remove the file.', () => {
    component.setUserSignupNifForm();
    component.attachments.push(attachment);
    component.removeFile(0);
    expect(component.attachments.length).toBe(0);
  });

  it('when setupReader passed some undfined file, it should push errors into the error stack about the same', () => {
    spyOn(component.uploadErrors, 'push');
    const file = undefined;
    component.setupReader(file, '');
    expect(component.uploadErrors.push).toHaveBeenCalled();
  });

  it('when setupReader passed some invalid file, it should push errors into the error stack about the same', () => {
    spyOn(component.uploadErrors, 'push');
    const file = { name: 'test.pdf', size: 632480, type: 'application/text' };
    component.setupReader(file, '');
    expect(component.uploadErrors.push).toHaveBeenCalled();
  });

  it('when setupReader passed some big file, it should push errors into the error stack about the same', () => {
    spyOn(component.uploadErrors, 'push');
    const file = { name: 'test.pdf', size: 63248000, type: 'application/text' };
    component.setupReader(file, '');
    expect(component.uploadErrors.push).toHaveBeenCalled();
  });

  it('setupReader should not process file and add to pipeline, when file read operation is aborted', () => {
    const currentUploadPipeLineLength = component.attachments.length;
    const content = 'Hello World';
    const data = new Blob([content], { type: 'application/pdf' });
    const arrayOfBlob = new Array<Blob>();
    arrayOfBlob.push(data);
    const file = new File(arrayOfBlob, 'Mock.pdf', { type: 'application/pdf' });

    component.setupReader(file, '');
    component.fileReader.abort();
    expect(component.attachments.length).toBe(currentUploadPipeLineLength);
  });

  it('setupReader should process file and initiate call to push the file into the pipeline, when vaild file is supplied', () => {
    const currentFilePipeLineCount = component.attachments.length;
    const content = 'Hello World';
    const data = new Blob([content], { type: 'application/pdf' });
    const arrayOfBlob = new Array<Blob>();
    arrayOfBlob.push(data);
    const file = new File(arrayOfBlob, 'Mock.pdf', { type: 'application/pdf' });
    component.setupReader(file, '');
    component.fileReader.onloadend = (e) => {
      expect(component.attachments.length).toBeGreaterThan(currentFilePipeLineCount);
    };
  });
});
