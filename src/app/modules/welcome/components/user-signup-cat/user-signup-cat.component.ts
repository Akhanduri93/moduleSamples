import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { MatSnackBar } from '../../../../../../node_modules/@angular/material';
import { AlertBarComponent } from '../../../../shared/components/alert-bar/alert-bar.component';
import { SignupUser } from '../../../../shared/models/signupuser';
import { SignupService } from '../../../../core/http/signup.service';
import { AccountService } from '../../../../core/http/account.service';
import { SignupCategories, SignupSubCategories } from '../../../../shared/models/signupcategories';
import { Subscription } from 'rxjs';

@Component({
  moduleId: module.id,
  selector: 'app-user-signup-cat',
  templateUrl: './user-signup-cat.component.html',
  styleUrls: ['./user-signup-cat.component.scss']
})

export class UserSignupCatComponent implements OnInit, OnDestroy {

  @Input() user: SignupUser;
  @Output() registerCat = new EventEmitter();
  @Output() goToBackToNif = new EventEmitter();


  userSignupCatForm: FormGroup;
  hide = true;
  powerFields = false;
  nifFields = false;
  nameDisabled = true;
  signupCats: SignupCategories[];
  categoryFields: FormArray = new FormArray([]);
  selectedCats = 0;
  showCatError = false;
  userSubCategories: SignupSubCategories[] = [];
  categoriesSubscription: Subscription;
  existingUserSubscription: Subscription;
  registerSubscription: Subscription;
  newUserCatDetails: SignupUser;
  isLoading = false;
  industry;

  constructor(
    private signupCat: AccountService,
    private signupService: SignupService,
    private snackBar: MatSnackBar
  ) {

  }

  showIndustry(index) {
    this.industry = index;
  }

  hideIndustry(index) {
    this.industry = false;
  }

  ngOnInit() {
    // console.log(this.user);
    this.pullSignupCategories();
  }

  setUserSubCategories() {
    const catToSearchIn: SignupCategories[] = this.user.categories;
    if (catToSearchIn) {
      catToSearchIn.forEach((searchCat, searchCatIndex) => {
        const subCatToSearchIn = searchCat.subcategories;
        if (subCatToSearchIn) {
          subCatToSearchIn.forEach((searchSubCat, searchSubCatIndex) => {
            this.userSubCategories.push(searchSubCat);
          });
        }
      });
    }
    this.setSignupCatForm();
  }

  pullSignupCategories() {
    this.categoriesSubscription = this.signupCat.getAccountIndustries().subscribe((cats) => {
      this.signupCats = cats;
      this.setUserSubCategories();
    },
      (error) => {
        this.snackBar.openFromComponent(AlertBarComponent, {
          data: 'Erro inesperado. Por favor, tente novamente mais tarde.',
          panelClass: 'error-snackbar'
        });
      });
  }

  setSignupCatForm() {
    this.setCategoryFormFields();
    this.userSignupCatForm = new FormGroup({
      cF: this.categoryFields,
      // description: new FormControl('')
    });
  }


  getUsersCategoryValueToSetT(category: SignupCategories): boolean {
    const catToSearchIn: SignupCategories[] = this.user.categories;
    let catValueToSet = false;
    if (catToSearchIn) {
      const catFoundIndex = catToSearchIn.findIndex(catTs => catTs.catename === category.catename);
      if (catFoundIndex !== -1) {
        catValueToSet = true;
        this.selectedCats++;
      } else {
        catValueToSet = false;
      }
    }

    return catValueToSet;
  }

  getUsersSubCategoryValueToSet(subCategory: SignupSubCategories) {
    let subCatValueToSet = false;
    if (this.userSubCategories) {
      const subCatFoundIndex = this.userSubCategories
        .findIndex(subCatTs => subCatTs.subcatName === subCategory.subcatName);
      if (subCatFoundIndex !== -1) {
        subCatValueToSet = true;
      } else {
        subCatValueToSet = false;
      }
    } else {
      subCatValueToSet = false;
    }

    return subCatValueToSet;
  }

  setCategoryFormFields() {
    if (this.signupCats) {
      this.signupCats.forEach((cat, catIndex) => {
        const otherValue = this.user.otherCategory;
        const catValueToSet = this.getUsersCategoryValueToSetT(cat);

        if (cat.subcategories.length > 0) {
          const subCatFields: FormArray = new FormArray([]);
          cat.subcategories.forEach((subcat, subCatIndex) => {
            const subCatValueToSet = this.getUsersSubCategoryValueToSet(subcat);
            subCatFields.push(new FormGroup({
              subCatCheck: new FormControl(subCatValueToSet),
              subCatName: new FormControl(subcat.subcatName)
            }));
          });
          this.categoryFields.push(new FormGroup({
            userCheck: new FormControl(catValueToSet),
            catName: new FormControl(cat.catename),
            subF: subCatFields
          }));
        } else {
          const subCatFields: FormArray = new FormArray([]);
          if (cat.catename === 'Other') {
            this.categoryFields.push(new FormGroup({
              userCheck: new FormControl(catValueToSet),
              catName: new FormControl(cat.catename),
              subF: subCatFields,
              otherField: new FormControl(otherValue ? otherValue : '')
            }));
          } else {
            this.categoryFields.push(new FormGroup({
              userCheck: new FormControl(catValueToSet),
              catName: new FormControl(cat.catename),
              subF: subCatFields
            }));
          }
        }
      });
    }
  }

  extractCategoriesFormValues(formCategoryFields: FormArray) {
    const extractedCategories: SignupCategories[] = [];
    if (formCategoryFields) {
      for (let index = 0; index < formCategoryFields.length; index++) {
        const catField = <FormGroup>formCategoryFields.controls[index];
        if (catField.controls['userCheck'].value === true) {
          const selectedCat = new SignupCategories();
          selectedCat.catename = catField.controls['catName'].value;
          if (catField.controls['catName'].value === 'Other') {
            const otherValue = catField.controls['otherField'].value;
            this.newUserCatDetails.otherCategory = otherValue;
          } else {
            const subCatFields = <FormArray>catField.controls['subF'];
            if (subCatFields) {
              for (let jIndex = 0; jIndex < subCatFields.length; jIndex++) {
                const subCatField = <FormGroup>subCatFields.controls[jIndex];
                if (subCatField.controls['subCatCheck'].value === true) {
                  const selectedSubCat = new SignupSubCategories();
                  selectedSubCat.subcatName = subCatField.controls['subCatName'].value;
                  selectedCat.subcategories.push(selectedSubCat);
                }
              }
            }
          }
          extractedCategories.push(selectedCat);
        }
      }
    }

    return extractedCategories;
  }

  userRegisterCat(form: FormGroup) {
    if (this.selectedCats > 0) {
      if (form.valid) {
        this.newUserCatDetails = new SignupUser();
        // this.newUserCatDetails.aboutCompany = form.controls['description'].value;
        this.newUserCatDetails.categories = this.extractCategoriesFormValues(<FormArray>form.controls['cF']);
        this.newUserCatDetails.email = this.user.email;
        this.newUserCatDetails.fullaname = this.user.fullaname;
        this.newUserCatDetails.tele = this.user.tele;
        this.newUserCatDetails.companyname = this.user.companyname;
        this.newUserCatDetails.nif = this.user.nif;
        this.newUserCatDetails.address = this.user.address;
        this.newUserCatDetails.postalCode = this.user.postalCode;
        this.newUserCatDetails.city = this.user.city;
        this.newUserCatDetails.power = this.user.power;
        this.newUserCatDetails.powerEmail = this.user.powerEmail;
        this.newUserCatDetails.powerName = this.user.powerName;
        this.newUserCatDetails.pass = this.user.pass;
        this.newUserCatDetails.sfid = this.user.sfid;
        this.newUserCatDetails.cargo = this.user.cargo;
        this.newUserCatDetails.type = this.user.type;
        this.newUserCatDetails.anexBody = this.user.anexBody;
        this.newUserCatDetails.anexType = this.user.anexType;
        this.newUserCatDetails.ano = this.user.ano;
        this.newUserCatDetails.powerDepartment = this.user.powerDepartment;

        this.registerUser(this.newUserCatDetails);

        // tslint:disable-next-line:max-line-length
        // this.existingUserSubscription = this.signupService.checkAlreadyPresentUser(this.newUserCatDetails).subscribe((result) => {
        //     if (result === false) {
        //         this.registerUser(this.newUserCatDetails);
        //     } else {
        //         this.snackBar.openFromComponent(AlertBarComponent, {
        //             data: 'User already present with this email.',
        //             panelClass: 'error-snackbar'
        //         });
        //     }
        // }, (error) => {
        //     this.snackBar.openFromComponent(AlertBarComponent, {
        //         data: 'There is some problem, please try again.',
        //         panelClass: 'error-snackbar'
        //     });
        // });
      } else {

      }
    } else {
      this.showCatError = true;
    }
  }

  setCategory(index: string): void {
    const clickedCategory: SignupCategories = this.signupCats[index];
    const checlClickedValue = this.categoryFields.controls[index].controls['userCheck'].value;
    const checkClicked = this.categoryFields.controls[index].controls['catName'].value;
    if (checlClickedValue === true) {
      if (clickedCategory.subcategories && clickedCategory.subcategories.length > 0) {
        this.showIndustry(index);
      }
      this.selectedCats++;
      this.checkSubCategories(index);
      if (checkClicked === 'Other') {
        this.setValidatorForOther(index);
      }
    } else {
      this.selectedCats--;
      this.unCheckSubCategories(index);
      if (checkClicked === 'Other') {
        this.clearValidatorForOther(index);
      }
    }
  }

  checkSubCategories(catIndex: string) {
    const catField = <FormGroup>this.categoryFields.controls[catIndex];
    const subCatFields = <FormArray>catField.controls['subF'];
    if (subCatFields) {
      for (let jIndex = 0; jIndex < subCatFields.length; jIndex++) {
        const subCatField = <FormGroup>subCatFields.controls[jIndex];
        subCatField.controls['subCatCheck'].setValue(true);
      }
    }
  }

  unCheckSubCategories(catIndex: string) {
    const catField = <FormGroup>this.categoryFields.controls[catIndex];
    const subCatFields = <FormArray>catField.controls['subF'];
    if (subCatFields) {
      for (let jIndex = 0; jIndex < subCatFields.length; jIndex++) {
        const subCatField = <FormGroup>subCatFields.controls[jIndex];
        subCatField.controls['subCatCheck'].setValue(false);
      }
    }
  }

  setSubCategory(subCatIndex: string, catIndex: string): void {
    const catField = <FormGroup>this.categoryFields.controls[catIndex];
    const subCatFields = <FormArray>catField.controls['subF'];
    const checlClickedValue = subCatFields.controls[subCatIndex].controls['subCatCheck'].value;
    if (checlClickedValue === true) {
      const currentCatValue = catField.controls['userCheck'].value;
      if (currentCatValue === false) {
        catField.controls['userCheck'].setValue(true);
        this.selectedCats++;
      }
    } else {
      if (subCatFields) {
        let subCatFalseLength = 0;
        for (let jIndex = 0; jIndex < subCatFields.length; jIndex++) {
          const subCatField = <FormGroup>subCatFields.controls[jIndex];
          if (subCatField.controls['subCatCheck'].value === false) {
            subCatFalseLength++;
          }
        }

        if (subCatFalseLength === subCatFields.length) {
          catField.controls['userCheck'].setValue(false);
          this.selectedCats--;
        }
      }
    }
  }

  setValidatorForOther(index: string) {
    this.categoryFields.controls[index].controls['otherField'].clearValidators();
    this.categoryFields.controls[index].controls['otherField'].setValidators([Validators.required]);
    this.categoryFields.controls[index].controls['otherField'].updateValueAndValidity();
  }

  clearValidatorForOther(index: string) {
    this.categoryFields.controls[index].controls['otherField'].clearValidators();
    this.categoryFields.controls[index].controls['otherField'].updateValueAndValidity();
  }

  registerUser(account: SignupUser) {
    this.isLoading = true;
    this.userSignupCatForm.disable();
    this.registerSubscription = this.signupService.registerUser(account).subscribe(() => {
      this.isLoading = false;
      this.userSignupCatForm.enable();
      this.snackBar.openFromComponent(AlertBarComponent, {
        data: 'Registo efectuado com sucesso!',
        panelClass: 'success-snackbar'
      });
      this.registerCat.emit(account);
    }, (error) => {
      this.userSignupCatForm.enable();
      this.isLoading = false;
      if (error.status === 400) {
        this.snackBar.openFromComponent(AlertBarComponent, {
          data: 'Nenhuma conta foi encontrada.',
          panelClass: 'error-snackbar'
        });
      } else {
        if (error.status === 403) {
          this.snackBar.openFromComponent(AlertBarComponent, {
            data: 'Email já existe.',
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

  getOtherErrorMessage(index: string) {
    return this.categoryFields.controls[index].controls['otherField'].hasError('required') ? 'Other é obrigatório.' :
      '';
  }

  navigateBackToNifForm() {
    this.goToBackToNif.emit('');
  }

  ngOnDestroy() {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }

    if (this.existingUserSubscription) {
      this.existingUserSubscription.unsubscribe();
    }

    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
}
