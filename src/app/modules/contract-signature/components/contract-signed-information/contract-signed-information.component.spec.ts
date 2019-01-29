import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ContractSignedInformationComponent } from './contract-signed-information.component';
import { ContractSignatureServiceMock } from '../../../../core/mocks/contractSignature.service.mock';
import { AppMaterialModule } from '../../../../shared/app-material.module';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContractSignatureService } from '../../../../core/http/contract-signature.service';
import { CurrencyFormat } from '../../../../shared/pipes/currency.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ContractSignedInformationComponent', () => {
  let component: ContractSignedInformationComponent;
  let fixture: ComponentFixture<ContractSignedInformationComponent>;
  let service;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContractSignedInformationComponent, CardComponent, CurrencyFormat],
      imports: [BrowserAnimationsModule, AppMaterialModule, RouterTestingModule, HttpClientTestingModule],
      providers: [ContractSignatureService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    service = new ContractSignatureServiceMock();
    fixture = TestBed.createComponent(ContractSignedInformationComponent);
    component = fixture.componentInstance;
    component.signedInfo = service.signedTestData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a mat-label', () => {
    const de = fixture.debugElement.query(By.css('mat-label')).nativeElement;
    expect(de.innerText).toBe('Esigned by:');
  });

  it('should show image', () => {
    const de = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(de).not.toBeNull();
  });

  it('should show the user name', () => {
    const de = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(de.innerText).toBe(component.signedInfo.name);
  });

  it('should show the id and contract signed date', () => {
    const de = fixture.debugElement.queryAll(By.css('span'));
    const numberElement: HTMLElement = de[0].nativeElement;
    expect(numberElement.innerText).toBe(component.signedInfo.id);

    const dateElement: HTMLElement = de[1].nativeElement;
    expect(dateElement.innerText).not.toBeNull();
  });

  it('should show the finalizar button', () => {
    const de = fixture.debugElement.query(By.css('button'));
    const buttonElement: HTMLElement = de.nativeElement;
    expect(buttonElement.innerText).toBe('FINALIZAR');
  });
});
