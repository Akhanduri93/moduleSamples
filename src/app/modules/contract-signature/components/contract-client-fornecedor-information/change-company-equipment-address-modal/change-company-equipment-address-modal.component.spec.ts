import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChangeCompanyEquipmentAddressModalComponent } from './change-company-equipment-address-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../../../../shared/app-material.module';
import { ContractSignatureServiceMock } from '../../../../../core/mocks/contractSignature.service.mock';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ContractSignatureService } from '../../../../../core/http/contract-signature.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ChangeCompanyEquipmentAddressModalComponent', () => {
  let component: ChangeCompanyEquipmentAddressModalComponent;
  let fixture: ComponentFixture<ChangeCompanyEquipmentAddressModalComponent>;
  let testService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeCompanyEquipmentAddressModalComponent],
      imports: [BrowserAnimationsModule, ReactiveFormsModule, AppMaterialModule, HttpClientTestingModule],
      providers: [ContractSignatureServiceMock, ContractSignatureService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: ContractSignatureService, useClass: ContractSignatureServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    testService = new ContractSignatureServiceMock();
    fixture = TestBed.createComponent(ChangeCompanyEquipmentAddressModalComponent);
    component = fixture.componentInstance;
    component.data = testService.clientEquipmentInfoModalTestData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the modal title', () => {
    component.modalTitle = 'Alterar Morada da Empresa';
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('h3'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain(component.modalTitle);
  });

  it('should have change address Form', () => {
    const de = fixture.debugElement.query(By.css('form'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
  });

  it('should have Form fields', () => {
    const formFields = fixture.debugElement.queryAll(By.css('input'));

    const streetField: HTMLElement = formFields[0].nativeElement;
    expect(streetField).not.toBeNull();

    const numField: HTMLElement = formFields[1].nativeElement;
    expect(numField).not.toBeNull();

    const andarField: HTMLElement = formFields[2].nativeElement;
    expect(andarField).not.toBeNull();

    const codeField: HTMLElement = formFields[3].nativeElement;
    expect(codeField).not.toBeNull();

    const cityField: HTMLElement = formFields[4].nativeElement;
    expect(cityField).not.toBeNull();

    const formSelectField = fixture.debugElement.query(By.css('mat-select'));
    const countryField: HTMLElement = formSelectField.nativeElement;
    expect(countryField).not.toBeNull();

  });

  it('should have submit and cancel button', () => {
    const compareTextConfirm = 'Confirmar';
    const compareTextCancel = 'Cancelar';
    fixture.detectChanges();
    const formButtons = fixture.debugElement.queryAll(By.css('button'));

    const cancelButton: HTMLElement = formButtons[0].nativeElement;
    expect(cancelButton).not.toBeNull();
    expect(cancelButton.innerText.toLowerCase()).toContain(compareTextCancel.toLowerCase());

    const confirmButton: HTMLElement = formButtons[1].nativeElement;
    expect(confirmButton).not.toBeNull();
    expect(confirmButton.innerText.toLowerCase()).toContain(compareTextConfirm.toLowerCase());
  });

  it('submit button should be disabled when required field values are not provided', () => {
    component.changeAddressForm.controls['street'].setValue('');
    component.changeAddressForm.controls['num'].setValue('');
    component.changeAddressForm.controls['floor'].setValue('');
    component.changeAddressForm.controls['code'].setValue('');
    component.changeAddressForm.controls['city'].setValue('');
    component.changeAddressForm.controls['country'].setValue('');
    fixture.detectChanges();
    const submitButton = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement;
    expect(submitButton.hasAttribute('disabled')).toBe(true);
  });

  it('submit button should be enabled when required fields values are provided', () => {
    component.changeAddressForm.controls['street'].setValue('test');
    component.changeAddressForm.controls['num'].setValue('123');
    component.changeAddressForm.controls['floor'].setValue('test');
    component.changeAddressForm.controls['code'].setValue('test');
    component.changeAddressForm.controls['city'].setValue('test');
    component.changeAddressForm.controls['country'].setValue('test');
    fixture.detectChanges();
    const submitButton = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement;
    expect(submitButton.hasAttribute('disabled')).toBe(false);
  });

  it('street field validity', () => {
    let errors = {};
    const street = component.changeAddressForm.controls['street'];
    street.setValue('');
    expect(street.valid).toBeFalsy();
    errors = street.errors || {};
    expect(errors['required']).toBeTruthy();

    street.setValue('test');
    errors = street.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(street.valid).toBeTruthy();
  });

  it('num field validity', () => {
    let errors = {};
    const num = component.changeAddressForm.controls['num'];
    num.setValue('');
    expect(num.valid).toBeFalsy();
    errors = num.errors || {};
    expect(errors['required']).toBeTruthy();

    num.setValue('123');
    errors = num.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(num.valid).toBeTruthy();
  });

  it('code field validity', () => {
    let errors = {};
    const code = component.changeAddressForm.controls['code'];
    code.setValue('');
    expect(code.valid).toBeFalsy();
    errors = code.errors || {};
    expect(errors['required']).toBeTruthy();

    code.setValue('test');
    errors = code.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(code.valid).toBeTruthy();
  });

  it('city field validity', () => {
    let errors = {};
    const city = component.changeAddressForm.controls['city'];
    city.setValue('');
    expect(city.valid).toBeFalsy();
    errors = city.errors || {};
    expect(errors['required']).toBeTruthy();

    city.setValue('test');
    errors = city.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(city.valid).toBeTruthy();
  });

  it('country field validity', () => {
    let errors = {};
    const country = component.changeAddressForm.controls['country'];
    country.setValue('');
    expect(country.valid).toBeFalsy();
    errors = country.errors || {};
    expect(errors['required']).toBeTruthy();

    country.setValue('test');
    errors = country.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(country.valid).toBeTruthy();
  });

});
