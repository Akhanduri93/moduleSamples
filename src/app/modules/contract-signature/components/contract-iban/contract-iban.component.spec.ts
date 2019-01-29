import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractIbanComponent } from './contract-iban.component';
import { By } from '@angular/platform-browser';
import { AppMaterialModule } from '../../../../shared/app-material.module';
import { ContractSignatureService } from '../../../../core/http/contract-signature.service';
import { ContractSignatureServiceMock } from '../../../../core/mocks/contractSignature.service.mock';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ContractIbanComponent Integration', () => {
  let component: ContractIbanComponent;
  let fixture: ComponentFixture<ContractIbanComponent>;
  let testService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContractIbanComponent],
      imports: [BrowserAnimationsModule, AppMaterialModule],
      providers: [ContractSignatureService, ContractSignatureServiceMock,
        { provide: ContractSignatureService, useClass: ContractSignatureServiceMock }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    testService = new ContractSignatureServiceMock();
    fixture = TestBed.createComponent(ContractIbanComponent);
    component = fixture.componentInstance;
    component.ibanInfo = testService.ibanTestData.iban;
    component.applicationPaymentMethod = testService.ibanTestData.applicationPaymentMethod;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the iban information', () => {
    const de = fixture.debugElement.query(By.css('.label-value'));
    const clientIbanElement: HTMLElement = de.nativeElement;
    expect(clientIbanElement.innerText).toContain(component.ibanInfo);
  });

  it('should show the edit icon', () => {
    const de = fixture.debugElement.query(By.css('mat-icon')).nativeElement;
    expect(de.innerText).toBe('edit');
  });

  it('should show the condition text', () => {
    const de = fixture.debugElement.query(By.css('.condition')).nativeElement;
    expect(de.innerText).toBe('* O Preenchimento do seu IBAN é obrigatório, ' +
      'mesmo que tenha optado pelo pagamento através de Referência Multibanco.');
  });

  it('should show the declaration checkbox information', () => {
    const de = fixture.debugElement.query(By.css('mat-checkbox'));
    const clientIbanElement: HTMLElement = de.nativeElement;
    expect(clientIbanElement).not.toBeNull();
  });

  it('should show the condition information', () => {
    const de = fixture.debugElement.query(By.css('.condition'));
    const clientIbanElement: HTMLElement = de.nativeElement;
    expect(clientIbanElement).not.toBeNull();
  });

});
