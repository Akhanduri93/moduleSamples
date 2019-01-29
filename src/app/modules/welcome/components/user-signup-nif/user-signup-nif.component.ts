import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { SignupUser } from '../../../../shared/models/signupuser';
import { Nif, NifAttachment, NifContact } from '../../../../shared/models/nif';
import { CustomValidators } from '../../../../shared/directives/custom-validators';
import { SignupService } from '../../../../core/http/signup.service';
import { Subscription } from 'rxjs';
import { AlertBarComponent } from '../../../../shared/components/alert-bar/alert-bar.component';
import { MatSnackBar } from '../../../../../../node_modules/@angular/material';
import { AuthenticationService } from '../../../../core/http/authentication.service';

@Component({
  moduleId: module.id,
  selector: 'app-user-signup-nif',
  templateUrl: './user-signup-nif.component.html',
  styleUrls: ['./user-signup-nif.component.scss']
})

export class UserSignupNifComponent implements OnInit, OnDestroy {

  @Input() user: SignupUser;
  userSignupNifForm: FormGroup;
  hide = true;
  powerNameReadOnly = false;
  powerCargoReadOnly = false;
  powerEmailReadOnly = false;
  powerFields = false;
  nifFields = false;
  nameDisabled = true;
  isNifNull = false;
  enableSubmit = false;
  ano = new Array();
  anexType = ['B', 'C'];
  powerMessage = 'Na base de dados constam alguns perfis associados à empresa. Selecione o seu.';
  nifActualContacts: NifContact[];
  nifContacts: any[] = [];
  attachments: NifAttachment[] = [];
  attachmentsProgressBar: number[] = [];
  uploadErrors: string[] = [];
  contactFields: FormArray = new FormArray([]);
  maxFileSize = 2000000;
  fileReader: FileReader;
  isLoading = false;
  alreadyExistBlock = false;
  emailVerification = false;
  emailVerified = false;
  @Output() nifRegistered = new EventEmitter();
  @Output() goToBackToSignUpForm = new EventEmitter();
  nifDetailSubscription: Subscription;
  userPresentSubscription: Subscription;

  constructor(
    private nifService: SignupService,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.setNifFormYear();
    this.setUserSignupNifForm();
    if (this.user.nif) {
      this.updateCurrentNifDetails();
    }
  }

  updateCurrentNifDetails() {
    this.userSignupNifForm.controls['nif'].setValue(this.user.nif);
    this.userSignupNifForm.controls['nif'].updateValueAndValidity();
    this.getDetailsFromNif();
  }

  getDetailsFromNif() {
    this.alreadyExistBlock = false;
    if (this.userSignupNifForm.controls['nif'].status === 'VALID') {
      this.nifFields = false;
      this.isLoading = true;
      this.nifActualContacts = [];
      this.nifContacts = [];
      this.attachments = [];
      const nifValue = this.userSignupNifForm.controls['nif'].value;
      this.userSignupNifForm.controls['nif'].disable();
      this.nifDetailSubscription = this.nifService.validate(nifValue, this.user).subscribe((nifDetail) => {
        this.isLoading = false;
        this.userSignupNifForm.controls['nif'].enable();
        this.updateNifFormFieldsWithNifDetail(nifDetail);
      },
        error => {
          this.isLoading = false;
          this.nifFields = false;
          this.userSignupNifForm.controls['nif'].enable();
          if (error.status === 400) {
            this.snackBar.openFromComponent(AlertBarComponent, {
              data: 'Nenhuma conta encontrada.',
              panelClass: 'error-snackbar'
            });
          } else {
            if (error.status === 403) {
              this.alreadyExistBlock = true;
              this.snackBar.openFromComponent(AlertBarComponent, {
                data: 'O utilizador não tem permissões para aceder a esta conta. Já existe um login para este NIF.',
                panelClass: 'error-snackbar'
              });
            } else {
              this.snackBar.openFromComponent(AlertBarComponent, {
                data: 'Falha no registo, por favor tente novamente.',
                panelClass: 'error-snackbar'
              });
            }
          }
        });
    }
  }

  setNifFields(field: string, value?, enable?: boolean, validators?, disable?, clearValidators?) {
    if (enable === true) {
      this.userSignupNifForm.controls[field].enable();
    }

    if (validators) {
      this.setNifFieldValidators(field, validators);
    }

    if (clearValidators) {
      this.userSignupNifForm.controls[field].clearValidators();
    }

    if (value !== null || value !== undefined) {
      this.userSignupNifForm.controls[field].setValue(value);
    }

    if (disable === true) {
      this.userSignupNifForm.controls[field].disable();
    }

    this.userSignupNifForm.controls[field].updateValueAndValidity();
  }

  setNifFieldValidators(field: string, validators?) {
    this.userSignupNifForm.controls[field].setValidators(validators);
    this.userSignupNifForm.controls[field].updateValueAndValidity();
  }

  setBaseForceFields(powerValue: string) {
    if (powerValue === 'Sim') {
      this.setNifFields('forceName', (this.user.fullaname) ? this.user.fullaname : '', null,
        [Validators.required, CustomValidators.lastNameValidate('forceName')], true);
      this.setNifFields('forceCargo', (this.user.cargo) ? this.user.cargo : '', true, [Validators.required], null);
      this.setNifFields('forceEmail', (this.user.email) ? this.user.email : '', null,
      [Validators.required, CustomValidators.validateEmail('forceEmail')], true);
    } else {
      this.setNifFields('forceName', (this.user.powerName) ? this.user.powerName : '', true,
        [Validators.required, CustomValidators.lastNameValidate('forceName')], null);
      this.setNifFields('forceCargo', (this.user.cargo) ? this.user.cargo : '', true, [Validators.required], null);
      this.setNifFields('forceEmail', (this.user.powerEmail) ? this.user.powerEmail : '', true,
        [Validators.required, CustomValidators.validateEmail('forceEmail'),
        CustomValidators.nifNaoEmailValidate('forceEmail', this.user.email)], null);
    }
  }

  attachmentFields(enable?) {
    const dObj = new Date();
    const currentYear = dObj.getFullYear();
    const defaultAnexType = 'C';

    if (enable === true) {
      this.setNifFields('ano', (this.user.ano) ? this.user.ano : currentYear.toString(), null, [Validators.required]);
      this.setNifFields('anexType', (this.user.anexType) ? this.user.anexType : defaultAnexType, null, [Validators.required]);
      this.setNifFields('anexFile', null, null, [Validators.required]);
    }

    if (enable === false) {
      this.setNifFields('ano', (this.user.ano) ? this.user.ano : currentYear.toString(), null, null, null, true);
      this.setNifFields('anexType', (this.user.anexType) ? this.user.anexType : defaultAnexType, null, null, null, true);
      this.setNifFields('anexFile', null, null, null, null, true);
    }
  }


  updateNifFormFieldsWithNifDetail(nif: Nif) {
    const powerFieldValue = this.userSignupNifForm.controls['power'].value;
    this.nifFields = true;
    this.nameDisabled = false;
    this.enableSubmit = true;
    this.user.sfid = nif.sfid;
    this.nifActualContacts = nif.contacts;
    this.isNifNull = this.checkNifNull(nif);
    this.powerFields = (this.user.power === true) ? true : (this.user.power === false) ? true : false;

    this.setNifFields('nome', (nif.companyname) ? nif.companyname : '', true);
    this.setNifFields('address', (nif.address) ? nif.address : '');
    this.setNifFields('postalCode', (nif.postalCode) ? nif.postalCode : '');
    this.setNifFields('city', (nif.city) ? nif.city : '');
    this.setNifFields('power', (this.user.power === true) ? 'Sim' : (this.user.power === false) ? 'Não' : '');
    this.setNifFields('anexFile', null, null, null, null, true);
    (this.user.power === true) ? this.setPowerMessage('Sim') : this.setPowerMessage('Não');
    if (this.isNifNull === true) {
      this.attachmentFields(true);
      this.setBaseForceFields(powerFieldValue);
      this.nifContacts = [];
    } else {
      if (this.nifActualContacts && this.nifActualContacts.length > 0) {
        this.setNifFieldValidators('chosenContact', [Validators.required]);
        this.prepareContactListForTemplate(true);
        this.setContact();
      } else {
        this.setNifFields('chosenContact', null, null, null, null, true);
        this.attachmentFields(false);
        this.setBaseForceFields(powerFieldValue);
        this.nifContacts = [];
      }
    }
  }

  setContact() {
    let contactIndex;
    const contactToFind = (this.user.chosenContact) ? this.user.chosenContact :
      (this.userSignupNifForm.controls['chosenContact'].value) ? this.userSignupNifForm.controls['chosenContact'].value : '';
    if (contactToFind) {
      contactIndex = this.nifContacts.findIndex(contact => contact.radioValue === contactToFind);
    }
    if (contactIndex >= 0) {
      this.markContactForSubmission(contactIndex);
      this.setNifFields('chosenContact', this.nifContacts[contactIndex].radioValue);
    }
  }

  setContactFields(contact, index?) {
    if (this.contactFields.length >= (this.nifActualContacts.length + 1)) {
      const usersUpdatedFields = <FormArray>this.userSignupNifForm.controls['cF'];
      const iUserField = <FormGroup>usersUpdatedFields.controls[index];
      iUserField.controls['userCargo'].setValue(contact.useCargo);
      iUserField.controls['userEmail'].setValue(contact.useEmail);
      iUserField.controls['userName'].setValue(contact.userName);
      iUserField.controls['userDepartment'].setValue(contact.department);
    } else {
      this.contactFields.push(new FormGroup({
        userCargo: new FormControl(contact.useCargo),
        userDepartment: new FormControl(contact.department),
        userEmail: new FormControl(contact.useEmail),
        userName: new FormControl(contact.userName)
      }));
    }
  }

  prepareContactListForTemplate(considerOutro: boolean) {
    const signingAuthority = this.userSignupNifForm.controls['power'].value;
    if (this.nifActualContacts) {
      this.nifActualContacts.forEach((contact, index) => {
        const tempContact: any = contact;
        tempContact.department = contact.department;
        tempContact.useCargo = contact.cargo;
        tempContact.userName = (contact.name) ? contact.name : '';
        tempContact.radioValue = contact.name + ' ' + contact.cargo;
        tempContact.cargoReadOnly = false;
        tempContact.userNameReadOnly = true;
        tempContact.useEmail = (signingAuthority === 'Sim') ? this.user.email : (this.user.powerEmail) ? this.user.powerEmail : '';
        tempContact.userNameShow = (signingAuthority === 'Sim') ? false : true;
        tempContact.emailReadOnly = (signingAuthority === 'Sim') ? true : false;
        if (this.user.chosenContact) {
          if (tempContact.radioValue === this.user.chosenContact) {
            tempContact.useCargo = this.user.cargo;
            tempContact.department = this.user.powerDepartment;
            tempContact.useEmail = (signingAuthority === 'Sim') ? this.user.email : this.user.powerEmail;
            tempContact.userName = (this.user.powerName) ? this.user.powerName : '';
          }
        }
        this.nifContacts[index] = tempContact;
        this.nifContacts[index].showField = false;
        this.setContactFields(tempContact, index);
      });
    } else {
      this.nifActualContacts = [];
      this.nifContacts = [];
    }
    this.prepareOutroInTemplateContactList(considerOutro);
  }

  prepareOutroInTemplateContactList(considerOutro: boolean) {
    const signingAuthority = this.userSignupNifForm.controls['power'].value;
    const outroIndex = this.nifContacts.findIndex(contact => contact.name === 'Nenhum dos perfis acima');
    if (outroIndex < 0) {
      const outroContact = {
        email: '',
        cargo: '',
        department: '',
        showField: false,
        cargoReadOnly: false,
        userNameShow: (signingAuthority === 'Sim') ? false : true,
        emailReadOnly: (signingAuthority === 'Sim') ? true : false,
        name: 'Nenhum dos perfis acima',
        radioValue: 'Nenhum dos perfis acima',
        useName: (signingAuthority === 'Sim') ? 'Nenhum dos perfis acima' : (this.user.powerName) ? this.user.powerName : '',
        userName: (signingAuthority === 'Sim') ? (this.user.fullaname) ? this.user.fullaname : '' :
          (this.user.powerName) ? this.user.powerName : '',
        useCargo: (this.user.cargo) ? this.user.cargo : '',
        useEmail: (signingAuthority === 'Sim') ? (this.user.email) ? this.user.email : '' :
          (this.user.powerEmail) ? this.user.powerEmail : ''
      };
      this.nifContacts.push(outroContact);
      this.setContactFields(outroContact);
    } else {
      this.nifContacts[outroIndex].emailReadOnly = (signingAuthority === 'Sim') ? true : false;
      this.nifContacts[outroIndex].userNameShow = (signingAuthority === 'Sim') ? false : true;
      const outroContact = {
        userName: (signingAuthority === 'Sim') ? (this.user.fullaname) ? this.user.fullaname : '' :
          (this.user.powerName) ? this.user.powerName : '',
        useName: (signingAuthority === 'Sim') ? 'Nenhum dos perfis acima' : (this.user.powerName) ? this.user.powerName : '',
        useCargo: (this.user.cargo) ? this.user.cargo : '',
        useEmail: (signingAuthority === 'Sim') ? (this.user.email) ? this.user.email : '' :
          (this.user.powerEmail) ? this.user.powerEmail : ''
      };
      this.setContactFields(outroContact, outroIndex);
    }
  }

  checkNifNull(nif: Nif) {
    let nifNull;
    if (nif.companyname === undefined || nif.companyname === null) {
      nifNull = true;
    } else {
      nifNull = false;
    }
    return nifNull;
  }

  checkFile(tocheck: string, inputFile: any) {
    let checkStatus = '0';
    if (tocheck === 'filedefined') {
      if (inputFile !== undefined) {
        checkStatus = '1';
      } else {
        checkStatus = '0';
      }

    }

    if (tocheck === 'filetype') {
      if (inputFile.type.search(/pdf/i) !== -1) {
        checkStatus = '1';
      } else {
        checkStatus = '0';
      }
    }

    if (tocheck === 'filesize') {
      if (inputFile.size <= this.maxFileSize) {
        checkStatus = '1';
      } else {
        checkStatus = '0';
      }

    }

    return checkStatus;
  }

  addFile(event) {
    this.attachmentsProgressBar = [];
    this.uploadErrors = [];
    for (let i = 0; i < event.target.files.length; i++) {
      this.attachmentsProgressBar.push();
      this.setupReader(event.target.files[i], i);
    }
    event.target.value = null;
  }

  /* */
  setupReader(file, position) {
    let fileValid = '0';
    fileValid = this.checkFile('filedefined', file);
    this.attachmentsProgressBar[position] = 5;
    if (fileValid !== '0') {
      fileValid = this.checkFile('filetype', file);
      this.attachmentsProgressBar[position] = 10;
      if (fileValid !== '0') {
        this.attachmentsProgressBar[position] = 15;
        fileValid = this.checkFile('filesize', file);
        if (fileValid !== '0') {
          this.attachmentsProgressBar[position] = 25;
          let newCaseAttachment;
          this.fileReader = new FileReader();
          this.attachmentsProgressBar[position] = 45;
          this.fileReader.onload = (e) => {
            this.attachmentsProgressBar[position] = 50;
            const name = file.name;
            const attachmentBody = window.btoa(<string>this.fileReader.result);  // Base 64 encode the file before sending it
            this.attachmentsProgressBar[position] = 85;
            newCaseAttachment = new NifAttachment(name, attachmentBody);
            this.attachmentsProgressBar[position] = 100;
            this.pushtoAttachments(newCaseAttachment);
          };
          this.fileReader.onerror = function (e) {
            // alert('Erro ao ler o ficheiro. Por favor, tente novamente.');
          };
          this.fileReader.onabort = function (e) {
            // alert('Erro ao ler o ficheiro. Por favor, tente novamente.');
          };
          this.fileReader.readAsBinaryString(file);  // Read the body of the file
        } else {
          this.attachmentsProgressBar.splice(position, 1);
          this.uploadErrors.push('Falha ao carregar ' + file.name + '. O ficheiro excede o tamanho limite permitido de 2MB.');
          // alert('File must be under 4.3 MB in size. Your file is too large. Please try again.');
        }
      } else {
        this.attachmentsProgressBar.splice(position, 1);
        this.uploadErrors.push('Falha ao carregar ' + file.name + '. Por favor selecione um ficheiro no formato PDF.');
      }
    } else {
      this.attachmentsProgressBar.splice(position, 1);
      this.uploadErrors.push('Falha ao carregar. Ficheiro não encontrado.');
      // alert('Deve escolher um ficheiro antes de tentar envia-lo.');
    }
  }

  pushtoAttachments(newCaseAttachment) {
    this.attachments.push(newCaseAttachment);
  }

  removeFile(index) {
    this.attachments.splice(index, 1);
    this.userSignupNifForm.controls['anexFile'].setValue('');
  }

  updatePowerFieldToSetContactListOnTemplate(input: string) {
    this.emailVerified = false;
    this.userSignupNifForm.controls['power'].setValue(input);
    this.setPowerMessage(input);
    (input) ? this.powerFields = true : this.powerFields = false;
    if (this.nifActualContacts && this.nifActualContacts.length > 0) {
      this.setNifFieldValidators('chosenContact', [Validators.required]);
      this.prepareContactListForTemplate(true);
      this.setContact();
    } else {
      this.setNifFields('chosenContact', null, null, null, null, true);
      // this.attachmentFields((this.isNifNull === true) ? true : false);
      this.setBaseForceFields(input);
      this.nifContacts = [];
    }
  }

  setPowerMessage(input: string) {
    (input === 'Sim') ? this.powerMessage = 'Na base de dados constam alguns perfis associados à empresa. Selecione o seu.' :
    this.powerMessage = 'Indique um contacto que obrigue a empresa para ser notificado.';
  }

  contactFieldClearValidators(field, index?) {
    const usersUpdatedFields = <FormArray>this.userSignupNifForm.controls['cF'];
    const iUserField = <FormGroup>usersUpdatedFields.controls[index];
    iUserField.controls[field].clearValidators();
    iUserField.controls[field].updateValueAndValidity();
  }

  clearContactFieldValidators() {
    const usersUpdatedFields = <FormArray>this.userSignupNifForm.controls['cF'];
    for (let iIndex = 0; iIndex < usersUpdatedFields.length; iIndex++) {
      this.contactFieldClearValidators('userCargo', iIndex);
      this.contactFieldClearValidators('userEmail', iIndex);
      this.contactFieldClearValidators('userName', iIndex);
    }
  }

  enableContactFieldValidator(field, index?, validator?) {
    const usersUpdatedFields = <FormArray>this.userSignupNifForm.controls['cF'];
    const userField = <FormGroup>usersUpdatedFields.controls[index];
    userField.controls[field].setValidators(validator);
    userField.controls[field].updateValueAndValidity();
  }

  disableContactField(field, index?, disable?: boolean) {
    const usersUpdatedFields = <FormArray>this.userSignupNifForm.controls['cF'];
    const userField = <FormGroup>usersUpdatedFields.controls[index];
    if (disable === true) {
      userField.controls[field].disable();
    } else {
      userField.controls[field].enable();
    }
    userField.controls[field].updateValueAndValidity();
  }

  setContFieldOnError(field, index?, error?) {
    const usersUpdatedFields = <FormArray>this.userSignupNifForm.controls['cF'];
    const userField = <FormGroup>usersUpdatedFields.controls[index];
    userField.controls[field].setErrors(error);
  }

  setContactFieldProperties(index?) {
    this.clearContactFieldValidators();

    const powerFieldValue = this.userSignupNifForm.controls['power'].value;
    this.enableContactFieldValidator('userName', index, [Validators.required, CustomValidators.lastNameValidate('userName')]);
    this.enableContactFieldValidator('userCargo', index, [Validators.required]);
    if (powerFieldValue === 'Sim') {
      this.enableContactFieldValidator('userEmail', index, [Validators.required, Validators.email]);
    } else {
      this.enableContactFieldValidator('userEmail', index, [Validators.required, CustomValidators.validateEmail('userEmail'),
      CustomValidators.nifNaoEmailValidate('userEmail', this.user.email)]);
    }

    if (this.nifContacts[index].cargoReadOnly === true) {
      this.disableContactField('userCargo', index, true);
    } else {
      this.disableContactField('userCargo', index, false);
    }

    if (this.nifContacts[index].emailReadOnly === true) {
      this.disableContactField('userEmail', index, true);
    } else {
      this.disableContactField('userEmail', index, false);
    }

    if (this.nifContacts[index].userNameReadOnly === true) {
      this.disableContactField('userName', index, true);
    } else {
      this.disableContactField('userName', index, false);
    }
  }

  markContactForSubmission(index) {
    this.emailVerified = false;
    this.userSignupNifForm.controls['chosenContact'].setValue(this.nifContacts[index].radioValue);
    const usersUpdatedFields = <FormArray>this.userSignupNifForm.controls['cF'];
    const userField = <FormGroup>usersUpdatedFields.controls[index];
    this.nifContacts.forEach((contact, currentIndex) => {
      contact.showField = false;
    });
    const powerFieldValue = this.userSignupNifForm.controls['power'].value;
    const nameToGo = (powerFieldValue === 'Não') ? this.nifContacts[index].name :
    (this.nifContacts[index].name === 'Nenhum dos perfis acima') ? this.user.fullaname : this.nifContacts[index].name;
    this.setContactFieldProperties(index);

    this.updateNifForm(nameToGo, userField.controls['userCargo'].value,
      userField.controls['userEmail'].value, userField.controls['userDepartment'].value);
    this.nifContacts[index].showField = true;
  }

  updateNifForm(name?: string, cargo?: string, email?: string, department?: string) {
    if (name !== '') {
      this.setNifFields('forceName', name);
    }

    if (cargo !== '') {
      this.setNifFields('forceCargo', cargo);
    }

    if (email !== '') {
      this.setNifFields('forceEmail', email);
    }

    if (department !== '') {
      this.setNifFields('forceDepartment', department);
    }
  }

  updateContactCargoInNifForm(index: string, cargo: string) {
    this.setNifFields('forceCargo', cargo);
  }

  updateContactEmailInNifForm(index: string, email: string) {
    const usersUpdatedFields = <FormArray>this.userSignupNifForm.controls['cF'];
    const userField = <FormGroup>usersUpdatedFields.controls[index];
    this.enableSubmit = false;
    this.emailVerified = false;
    // this.setContFieldOnError('userEmail', index, { email: null });
    if (userField.controls['userEmail'].valid === true) {
      this.emailVerification = true;
      this.setContFieldOnError('userEmail', index, '');
      this.userPresentSubscription = this.authenticationService.validateEmail(email).subscribe((result) => {
        this.emailVerification = false;
        if (result === false) {
          this.enableSubmit = false;
          this.emailVerified = false;
          this.setContFieldOnError('userEmail', index, { notUnique: true });
        } else {
          this.setNifFields('forceEmail', email);
          this.enableSubmit = true;
          this.emailVerified = true;
        }
      }, error => {
        this.enableSubmit = false;
        this.emailVerified = false;
        this.emailVerification = false;
        if (error.status === 400) {
          this.setContFieldOnError('userEmail', index, { email: true });
        }
      });
    }
  }

  updateContactNomeInNifForm(index: string, name: string) {
    this.setNifFields('forceName', name);
  }

  setNifFormYear() {
    this.ano = [];
    const forLastYears = 2;
    const dObj = new Date();
    const currentYear = dObj.getFullYear();
    for (let index = 0; index <= forLastYears; index++) {
      const derivedYear = currentYear - index;
      this.ano.push(derivedYear.toString());
    }
  }

  setUserSignupNifForm() {
    this.userSignupNifForm = new FormGroup({
      nome: new FormControl({ value: this.user.companyname ? this.user.companyname : '', disabled: true }, [Validators.required]),
      nif: new FormControl(this.user.nif ? this.user.nif : '',
        [
          Validators.required,
          CustomValidators.validateNif('nif')
        ]),
      address: new FormControl(this.user.address ? this.user.address : '', [Validators.required]),
      postalCode: new FormControl(this.user.postalCode ? this.user.postalCode : '',
        [Validators.required, CustomValidators.postalCodeValidate('postalCode')]),
      city: new FormControl(this.user.city ? this.user.city : '', [Validators.required]),
      power: new FormControl((this.user.power === true) ? 'Sim' : (this.user.power === false) ? 'Não' : '', [Validators.required]),
      forceName: new FormControl((this.user.powerName) ? this.user.powerName : ''),
      forceEmail: new FormControl((this.user.powerEmail) ? this.user.powerEmail : ''),
      forceCargo: new FormControl((this.user.cargo) ? this.user.cargo : ''),
      forceDepartment: new FormControl((this.user.powerDepartment) ? this.user.powerDepartment : ''),
      chosenContact: new FormControl((this.user.chosenContact) ? this.user.chosenContact : ''),
      ano: new FormControl(),
      anexType: new FormControl(),
      anexFile: new FormControl(),
      cF: this.contactFields,
    });
  }

  userRegisterNif(signupForm: FormGroup) {
    if (signupForm.valid) {
      const yearOfIncome = (signupForm.controls['ano'].value) ? signupForm.controls['ano'].value : '';
      const account: SignupUser = {
        email: this.user.email,
        fullaname: this.user.fullaname,
        tele: this.user.tele,
        companyname: signupForm.controls['nome'].value,
        nif: signupForm.controls['nif'].value,
        address: signupForm.controls['address'].value,
        postalCode: signupForm.controls['postalCode'].value,
        city: signupForm.controls['city'].value,
        power: (signupForm.controls['power'].value === 'Sim') ? true : false,
        powerEmail: (signupForm.controls['power'].value === 'Sim') ? '' : signupForm.controls['forceEmail'].value,
        powerName: (signupForm.controls['power'].value === 'Sim') ? signupForm.controls['forceName'].value :
        signupForm.controls['forceName'].value,
        cargo: signupForm.controls['forceCargo'].value,
        powerDepartment: (signupForm.controls['forceDepartment'].value) ? signupForm.controls['forceDepartment'].value : '',
        chosenContact: signupForm.controls['chosenContact'].value,
        type: this.user.type,
        pass: this.user.pass,
        categories: [],
        ano: yearOfIncome,
        anexType: signupForm.controls['anexType'].value,
        sfid: this.user.sfid,
        anexBody: ((this.attachments.length > 0) && this.attachments[0].fileurl) ? this.attachments[0].fileurl : ''
      };
      this.nifRegistered.emit(account);
    }
  }

  checkIfExists() {
    this.enableSubmit = false;
    this.emailVerified = false;
    if (this.userSignupNifForm.controls['forceEmail'].status === 'VALID') {
      this.emailVerification = true;
      const account: SignupUser = new SignupUser();
      account.email = this.userSignupNifForm.controls['forceEmail'].value;
      this.userPresentSubscription = this.authenticationService.validateEmail(account.email).subscribe((result) => {
        this.emailVerification = false;
        if (result === false) {
          this.enableSubmit = false;
          this.emailVerified = false;
          this.userSignupNifForm.controls['forceEmail'].setErrors({ notUnique: true });
        } else {
          this.enableSubmit = true;
          this.emailVerified = true;
        }
      }, error => {
        this.enableSubmit = false;
        this.emailVerified = false;
        this.emailVerification = false;
        if (error.status === 400) {
          this.userSignupNifForm.controls['forceEmail'].setErrors({ email: true });
        }
      });
    }
  }

  navigateBackToSignUpForm() {
    this.goToBackToSignUpForm.emit(this.user.type);
  }

  getCNameErrorMessage() {
    return this.userSignupNifForm.controls['nome'].hasError('required') ? 'Nome é obrigatório.' :
      '';
  }

  getNifErrorMessage() {
    return this.userSignupNifForm.controls['nif'].hasError('required') ? 'NIF é obrigatório.' :
      this.userSignupNifForm.controls['nif'].hasError('invalid') ? 'NIF inválido.' :
        '';
  }

  getAddressErrorMessage() {
    return this.userSignupNifForm.controls['address'].hasError('required') ? 'Rua, Número, Andar… é obrigatório.' :
      '';
  }
  getPostalCodeErrorMessage() {
    return this.userSignupNifForm.controls['postalCode'].hasError('required') ? 'Código Postal é obrigatório.' :
      this.userSignupNifForm.controls['postalCode'].hasError('invalid') ? 'Código Postal inválido.' :
        '';
  }
  getCityErrorMessage() {
    return this.userSignupNifForm.controls['city'].hasError('required') ? 'Cidade é obrigatória.' :
      '';
  }

  getForceCargoErrorMessage() {
    return this.userSignupNifForm.controls['forceCargo'].hasError('required') ? 'Cargo é obrigatório.' :
      '';
  }

  getForceNameErrorMessage() {
    return this.userSignupNifForm.controls['forceName'].hasError('required') ? 'Nome é obrigatório.' :
      this.userSignupNifForm.controls['forceName'].hasError('last-name') ? 'Primeiro e último nome obrigatórios.' :
        this.userSignupNifForm.controls['forceName'].hasError('invalid') ? 'Nome inválido.' :
          '';
  }

  getForceEmailErrorMessage() {
    return this.userSignupNifForm.controls['forceEmail'].hasError('required') ? 'Email é obrigatório.' :
      this.userSignupNifForm.controls['forceEmail'].hasError('invalid') ? 'Email inválido.' :
        this.userSignupNifForm.controls['forceEmail'].hasError('invalid') ? 'Email inválido.' :
          this.userSignupNifForm.controls['forceEmail'].hasError('notUnique') ?
            'Este email já existe.' :
            '';
  }

  getFileErrorMessage() {
    return this.userSignupNifForm.controls['anexFile'].hasError('required') ? 'Anexo é obrigatório.' :
      '';
  }

  getContactNameErrorMessage(index) {
    const contactFields = <FormArray>this.userSignupNifForm.controls['cF'];
    const userField = <FormGroup>contactFields.controls[index];
    return userField.controls['userName'].hasError('required') ? 'Nome obrigatório.' :
      userField.controls['userName'].hasError('last-name') ? 'Primeiro e último nome obrigatórios.' :
        userField.controls['userName'].hasError('invalid') ? 'Nome inválido.' :
          '';
  }

  getContactCargoErrorMessage(index) {
    const contactFields = <FormArray>this.userSignupNifForm.controls['cF'];
    const userField = <FormGroup>contactFields.controls[index];
    return userField.controls['userCargo'].hasError('required') ? 'Cargo obrigatório.' :
      '';
  }

  getContactEmailErrorMessage(index) {
    const contactFields = <FormArray>this.userSignupNifForm.controls['cF'];
    const userField = <FormGroup>contactFields.controls[index];
    return userField.controls['userEmail'].hasError('required') ? 'Email é obrigatório.' :
      userField.controls['userEmail'].hasError('invalid') ? 'Email inválido.' : userField.controls['userEmail'].hasError('invalid') ?
        'Email inválido.' : userField.controls['userEmail'].hasError('notUnique') ?
          'Este email já existe.' :
          '';
  }

  ngOnDestroy() {
    if (this.nifDetailSubscription) {
      this.nifDetailSubscription.unsubscribe();
    }
  }
}
