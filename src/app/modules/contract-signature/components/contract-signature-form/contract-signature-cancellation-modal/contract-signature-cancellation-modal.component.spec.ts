import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ContractSignatureCancellationModalComponent } from './contract-signature-cancellation-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../../../../shared/app-material.module';
import { ContractSignatureServiceMock } from '../../../../../core/mocks/contractSignature.service.mock';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ContractSignatureService } from '../../../../../core/http/contract-signature.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ContractSignatureCancellationModalComponent', () => {
  let component: ContractSignatureCancellationModalComponent;
  let fixture: ComponentFixture<ContractSignatureCancellationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContractSignatureCancellationModalComponent],
      imports: [BrowserAnimationsModule, ReactiveFormsModule, AppMaterialModule,
        HttpClientTestingModule, RouterTestingModule],
      providers: [ContractSignatureServiceMock, ContractSignatureService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractSignatureCancellationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the modal title', () => {
    const de = fixture.debugElement.query(By.css('h3'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('Cancelar Aplicação');
  });

  it('should have cancel application Form', () => {
    const de = fixture.debugElement.query(By.css('form'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
  });

  it('should have Form fields', () => {
    fixture.detectChanges();
    const descriptionField = fixture.debugElement.query(By.css('textarea')).nativeElement;
    expect(descriptionField).not.toBeNull();
  });

  it('should have submit and voltar button', () => {
    const compareTextConfirm = 'Confirmar';
    const compareTextCancel = 'Voltar';
    fixture.detectChanges();
    const formButtons = fixture.debugElement.queryAll(By.css('button'));

    const cancelButton: HTMLElement = formButtons[0].nativeElement;
    expect(cancelButton).not.toBeNull();
    expect(cancelButton.innerText.toLowerCase()).toContain(compareTextCancel.toLowerCase());

    const confirmButton: HTMLElement = formButtons[1].nativeElement;
    expect(confirmButton).not.toBeNull();
    expect(confirmButton.innerText.toLowerCase()).toContain(compareTextConfirm.toLowerCase());
  });

  it('submit button should be enabled when required fields values are provided', () => {
    component.cancellationForm.controls['reason'].setValue('Os meus dados estão incorrectos');
    component.cancellationForm.controls['comment'].setValue('test');
    fixture.detectChanges();
    const submitButton = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement;
    expect(submitButton.hasAttribute('disabled')).toBe(false);
  });

  it('reason field validity', () => {
    let errors = {};
    const reason = component.cancellationForm.controls['reason'];
    reason.setValue('');
    expect(reason.valid).toBeFalsy();
    errors = reason.errors || {};
    expect(errors['required']).toBeTruthy();

    reason.setValue('test');
    errors = reason.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(reason.valid).toBeTruthy();
  });

});
