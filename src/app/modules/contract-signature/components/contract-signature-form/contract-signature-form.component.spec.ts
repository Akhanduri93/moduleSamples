import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractSignatureFormComponent } from './contract-signature-form.component';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../../../shared/app-material.module';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ContractSignatureServiceMock } from '../../../../core/mocks/contractSignature.service.mock';
import { ContractSignatureService } from '../../../../core/http/contract-signature.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContractSignedInformationComponent } from '../contract-signed-information/contract-signed-information.component';
import { CurrencyFormat } from '../../../../shared/pipes/currency.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ContractSignatureFormComponent Integration', () => {
  let component: ContractSignatureFormComponent;
  let fixture: ComponentFixture<ContractSignatureFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContractSignatureFormComponent, ContractSignedInformationComponent, CardComponent, CurrencyFormat],
      imports: [BrowserAnimationsModule, ReactiveFormsModule, AppMaterialModule, HttpClientTestingModule],
      providers: [ContractSignatureServiceMock, ContractSignatureService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const service = new ContractSignatureServiceMock();
    fixture = TestBed.createComponent(ContractSignatureFormComponent);
    component = fixture.componentInstance;
    component.personalGuarantee = service.personalGuaranteeTestData;
    component.signer = service.signerTestData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have change address Form', () => {
    const de = fixture.debugElement.query(By.css('form'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
  });

  it('should have Form fields', () => {
    const formFields = fixture.debugElement.queryAll(By.css('input'));

    const nameField: HTMLElement = formFields[0].nativeElement;
    expect(nameField).not.toBeNull();

    const telephoneNumberField: HTMLElement = formFields[1].nativeElement;
    expect(telephoneNumberField).not.toBeNull();

    const streetField: HTMLElement = formFields[2].nativeElement;
    expect(streetField).not.toBeNull();

    const nifField: HTMLElement = formFields[3].nativeElement;
    expect(nifField).not.toBeNull();

    const postalCodeField: HTMLElement = formFields[4].nativeElement;
    expect(postalCodeField).not.toBeNull();

    const cityField: HTMLElement = formFields[5].nativeElement;
    expect(cityField).not.toBeNull();

  });

});
