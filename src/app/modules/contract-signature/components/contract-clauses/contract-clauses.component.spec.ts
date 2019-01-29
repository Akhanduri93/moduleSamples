import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ContractClausesComponent } from './contract-clauses.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ContractSignatureFormComponent } from '../contract-signature-form/contract-signature-form.component';
import { AppMaterialModule } from '../../../../shared/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ContractSignatureServiceMock } from '../../../../core/mocks/contractSignature.service.mock';
import { ContractSignatureService } from '../../../../core/http/contract-signature.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContractSignedInformationComponent } from '../contract-signed-information/contract-signed-information.component';
import { CurrencyFormat } from '../../../../shared/pipes/currency.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ContractClausesComponent', () => {
  let component: ContractClausesComponent;
  let fixture: ComponentFixture<ContractClausesComponent>;
  let service;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContractClausesComponent, CardComponent, ContractSignatureFormComponent,
        ContractSignedInformationComponent, CurrencyFormat],
      imports: [BrowserAnimationsModule, AppMaterialModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [ContractSignatureServiceMock, ContractSignatureService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    service =  new ContractSignatureServiceMock();
    fixture = TestBed.createComponent(ContractClausesComponent);
    component = fixture.componentInstance;
    component.contractClauses = service.contractClauses;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain h3 element for clause heading', () => {
    const de = fixture.debugElement.queryAll(By.css('h3'))[0].nativeElement;
    expect(de.innerText).toBe(service.contractClauses[0].heading);
  });

  it('should contain p element for clause data', () => {
    const de = fixture.debugElement.queryAll(By.css('p'))[0].nativeElement;
    expect(de.innerText).toContain(service.contractClauses[0].clauses);
  });

});
