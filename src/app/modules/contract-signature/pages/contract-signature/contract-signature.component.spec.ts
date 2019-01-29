import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ContractSignatureComponent } from './contract-signature.component';
import { By } from '@angular/platform-browser';
import { AppMaterialModule } from '../../../../shared/app-material.module';
import {
  ContractClientInformationComponent
} from '../../components/contract-client-fornecedor-information/contract-client-information/contract-client-information.component';
import {
  ContractFornecedorInformationComponent
} from '../../components/contract-client-fornecedor-information/contract-fornecedor-information/contract-fornecedor-information.component';
import { ContractClausesComponent } from '../../components/contract-clauses/contract-clauses.component';
import { ContractSignatureServiceMock } from '../../../../core/mocks/contractSignature.service.mock';
import {
  ChangeCompanyEquipmentAddressModalComponent
} from '../../components/contract-client-fornecedor-information/change-company-equipment-address-modal/change-company-equipment-address-modal.component';
import { ChangeIBANModalComponent } from '../../components/contract-iban/change-iban-modal/change-iban-modal.component';
import {
  ContractSignatureCancellationModalComponent
} from '../../components/contract-signature-form/contract-signature-cancellation-modal/contract-signature-cancellation-modal.component';
import { ContractSignatureFormComponent } from '../../components/contract-signature-form/contract-signature-form.component';
import { MyPipesModule } from '../../../../shared/pipes/myPipes.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { ContractServiceMock } from '../../../../core/mocks/contract.service.mock';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContractIbanComponent } from '../../components/contract-iban/contract-iban.component';
import { ContractSignatureService } from '../../../../core/http/contract-signature.service';
import { ContractDetailsProvider } from '../../../contract-details/contract-details.provider';
import { DashboardModule } from '../../../dashboard/dashboard.module';
import { ContractSignedInformationComponent } from '../../components/contract-signed-information/contract-signed-information.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContractDetailsModule } from '../../../contract-details/contract-details.module';
import { ContractService } from '../../../../core/http/contract.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ContractSignatureComponent Integration', () => {
  let component: ContractSignatureComponent;
  let fixture: ComponentFixture<ContractSignatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContractSignatureComponent,
        ContractClientInformationComponent,
        ContractClausesComponent,
        ContractSignatureFormComponent,
        ContractSignatureCancellationModalComponent,
        ContractSignedInformationComponent,
        ContractFornecedorInformationComponent,
        ChangeIBANModalComponent, ChangeCompanyEquipmentAddressModalComponent, ContractIbanComponent],
      imports: [BrowserAnimationsModule, AppMaterialModule, HttpClientTestingModule, SharedModule, DashboardModule,
        MyPipesModule, ReactiveFormsModule, RouterTestingModule, FlexLayoutModule, ContractDetailsModule],
      providers: [ContractSignatureServiceMock, ContractSignatureService, ContractDetailsProvider,
        ContractService,
        { provide: ContractService, useClass: ContractServiceMock },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: ContractSignatureService, useClass: ContractSignatureServiceMock }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show company name and spelled correctly', () => {
    const companyName = 'Liqui.do S.A.';
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('h2'))[0].nativeElement;
    expect(de.innerText.toLowerCase()).toContain(companyName.toLowerCase());
  });

  it('should show company NIPC section and spelled correctly', () => {
    const companyNIFC = 'NIPC 513 626 930';
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.address'))[0].nativeElement;
    expect(de.innerText.toLowerCase()).toContain(companyNIFC.toLowerCase());
  });

  it('should show company Address section and spelled correctly', () => {
    const companyAddress = 'Rua Mar da China, 1, Esc 2.2';
    fixture.detectChanges();
    const de: HTMLElement = fixture.debugElement.queryAll(By.css('p'))[0].nativeElement;
    expect(de.innerText.toLowerCase()).toContain(companyAddress.toLowerCase());
  });

  it('should show company Address section and spelled correctly', () => {
    const companyAdd = '1990-137 Lisboa, Portugal';
    fixture.detectChanges();
    const de: HTMLElement = fixture.debugElement.queryAll(By.css('p'))[1].nativeElement;
    expect(de.innerText.toLowerCase()).toContain(companyAdd.toLowerCase());
  });

  it('should have iban section', () => {
    const de = fixture.debugElement.query(By.css('app-contract-iban')).nativeElement;
    expect(de).not.toBeNull();
  });

  it('should contain the contract number', () => {
    const de = fixture.debugElement.queryAll(By.css('h3'))[0].nativeElement;
    expect(de.innerText).toBe(component.contractSignature.application.name);
  });

  it('should contain the mat-vertical-stepper element', () => {
    const de = fixture.debugElement.query(By.css('mat-vertical-stepper')).nativeElement;
    expect(de).not.toBeNull();
  });

  it('mat-step should contain the  app-contract-signature-form  and PRÓXIMO button', () => {
    const signatureStep = fixture.debugElement.queryAll(By.css('.mat-step'))[0].nativeElement;
    expect(signatureStep).not.toBeNull();
    const signatureElement = signatureStep.querySelector('app-contract-signature-form ');
    expect(signatureElement).not.toBeNull();
    const signatureNextButton = signatureStep.querySelector('button');
    expect(signatureNextButton.innerText).toBe('PRÓXIMO');
  });

  it('mat-step should contain the app-contract-client-information', () => {
    const clientInfoStep = fixture.debugElement.queryAll(By.css('.mat-step'))[1].nativeElement;
    expect(clientInfoStep).not.toBeNull();
    const clientInfo = clientInfoStep.querySelector('app-contract-client-information');
    expect(clientInfo).not.toBeNull();
  });

  it('mat-step should contain the app-contract-fornecedor-information', () => {
    const providerInfoStep = fixture.debugElement.queryAll(By.css('.mat-step'))[2].nativeElement;
    expect(providerInfoStep).not.toBeNull();
    const providerInfo = providerInfoStep.querySelector('app-contract-fornecedor-information');
    expect(providerInfo).not.toBeNull();
  });

  it('mat-step should contain the app-contract-iban', () => {
    const ibanInfoStep = fixture.debugElement.queryAll(By.css('.mat-step'))[3].nativeElement;
    expect(ibanInfoStep).not.toBeNull();
    const ibanInfo = ibanInfoStep.querySelector('app-contract-iban');
    expect(ibanInfo).not.toBeNull();
  });

  it('mat-step should contain the app-application-values', () => {
    const applicationInfoStep = fixture.debugElement.queryAll(By.css('.mat-step'))[4].nativeElement;
    expect(applicationInfoStep).not.toBeNull();
    const applicationInfo = applicationInfoStep.querySelector('app-application-values');
    expect(applicationInfo).not.toBeNull();
  });

  it('mat-step should contain the app-contract-clauses', () => {
    const clauseInfoStep = fixture.debugElement.queryAll(By.css('.mat-step'))[5].nativeElement;
    expect(clauseInfoStep).not.toBeNull();
    const clauseInfo = clauseInfoStep.querySelector('app-contract-clauses');
    expect(clauseInfo).not.toBeNull();
  });

  it('should contain the app-contract-signed-information inside mat-card', () => {
    const service = new ContractSignatureServiceMock();
    component.signedInfo = service.signedTestData;
    fixture.detectChanges();
    const matCardElement = fixture.debugElement.queryAll(By.css('mat-card'))[0].nativeElement;
    expect(matCardElement).not.toBeNull();
    const headingElement = matCardElement.querySelector('h3');
    expect(headingElement.innerText).toBe('Assinatura Digital');
    const dividerElement = matCardElement.querySelector('mat-divider');
    expect(dividerElement).not.toBeNull();
    const signedInfo = matCardElement.querySelector('app-contract-signed-information');
    expect(signedInfo).not.toBeNull();
  });

  it('should contain the mat-card and mat-checkbox, Accept and decline buttons should be inside mat-card', () => {
    component.signedInfo = { name: null };
    fixture.detectChanges();
    const matCardElement = fixture.debugElement.queryAll(By.css('mat-card'))[0].nativeElement;
    expect(matCardElement).not.toBeNull();
    const matCheckBoxElement = matCardElement.querySelector('mat-checkbox');
    expect(matCheckBoxElement).not.toBeNull();
    const acceptButtonElement = matCardElement.querySelectorAll('button')[0];
    expect(acceptButtonElement.innerText).toBe('ACEITAR');
    const declineButtonElement = matCardElement.querySelectorAll('button')[1];
    expect(declineButtonElement.innerText).toBe('DECLINAR');
  });

});
