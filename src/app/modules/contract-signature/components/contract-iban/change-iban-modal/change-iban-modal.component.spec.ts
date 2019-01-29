import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChangeIBANModalComponent } from './change-iban-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../../../../shared/app-material.module';
import { ContractSignatureServiceMock } from '../../../../../core/mocks/contractSignature.service.mock';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ContractSignatureService } from '../../../../../core/http/contract-signature.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ChangeIBANModalComponent', () => {
  let component: ChangeIBANModalComponent;
  let fixture: ComponentFixture<ChangeIBANModalComponent>;
  let testService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeIBANModalComponent],
      imports: [BrowserAnimationsModule, ReactiveFormsModule, AppMaterialModule, HttpClientTestingModule],
      providers: [ContractSignatureServiceMock, ContractSignatureService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    testService = new ContractSignatureServiceMock();
    fixture = TestBed.createComponent(ChangeIBANModalComponent);
    component = fixture.componentInstance;
    component.data = testService.ibanTestData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the modal title', () => {
    const de = fixture.debugElement.query(By.css('h3'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('Alterar IBAN');
  });

  it('should have change address Form', () => {
    const de = fixture.debugElement.query(By.css('form'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
  });

  it('should have Form fields', () => {
    fixture.detectChanges();
    const formFields = fixture.debugElement.queryAll(By.css('input'));
    const ibanField: HTMLElement = formFields[0].nativeElement;
    expect(ibanField).not.toBeNull();

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
    component.ibanForm.controls['iban'].setValue(null);
    fixture.detectChanges();
    const submitButton = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement;
    expect(submitButton.hasAttribute('disabled')).toBe(true);
  });

  it('submit button should be enabled when required fields values are provided', () => {
    component.ibanForm.controls['iban'].setValue('200 323');
    fixture.detectChanges();
    const submitButton = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement;
    expect(submitButton.hasAttribute('disabled')).toBe(false);
  });

  it('iban field validity', () => {
    let errors = {};
    const iban = component.ibanForm.controls['iban'];
    iban.setValue('');
    expect(iban.valid).toBeFalsy();
    errors = iban.errors || {};
    expect(errors['required']).toBeTruthy();

    iban.setValue('123');
    errors = iban.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(iban.valid).toBeTruthy();
  });

});
