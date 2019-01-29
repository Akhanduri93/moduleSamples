import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractsTableComponent } from './contracts-table.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { FinancialStatusComponent } from '../financial-status/financial-status.component';
import { PaymentInformationComponent } from '../payment-information/payment-information.component';
import { ContractServiceMock } from '../../../../core/mocks/contract.service.mock';
import { AppMaterialModule } from '../../../../shared/app-material.module';
import { MyPipesModule } from '../../../../shared/pipes/myPipes.module';
import { AccountServiceMock } from '../../../../core/mocks/account.service.mock';
import { FinancialServiceMock } from '../../../../core/mocks/financial-status.service.mock';
import { InvoiceServiceMock } from '../../../../core/mocks/invoice.service.mock';
import { AccountService } from '../../../../core/http/account.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { ContractService } from '../../../../core/http/contract.service';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { FinancialService } from '../../../../core/http/financial.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StorageMock } from '../../../../core/mocks/storage.mock';
import { StarRatingComponent } from '../star-rating/star-rating.component';

describe('ContractsTableComponent Integration', () => {
  let component: ContractsTableComponent;
  let fixture: ComponentFixture<ContractsTableComponent>;
  const storageMock = new StorageMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        AppMaterialModule,
        MyPipesModule,
        FlexLayoutModule
      ],
      declarations: [
        ContractsTableComponent,
        CardComponent,
        StarRatingComponent,
      ],
      providers: [
        { provide: ContractService, useClass: ContractServiceMock },
        InvoiceServiceMock,
        LoadingService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    storageMock.setLocalStorage();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Contract Mat section should be Present', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.contract-mat'));
    const el: HTMLElement = de[0].nativeElement;
    expect(el).not.toBeNull();
  });

  it('company-info section should be Present', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.company-info'));
    const el: HTMLElement = de[0].nativeElement;
    const logoel: HTMLElement = el.querySelector('.logo');
    expect(el).not.toBeNull();
    expect(logoel).not.toBeNull();
    expect(el.outerHTML).toContain(new ContractServiceMock().contracts[0].vendorName);
  });

  it('contract-number section should be Present', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.mat-subheading-1'));
    const el: HTMLElement = de[0].nativeElement;
    const contractName: HTMLElement = el.querySelector('.mat-body-2');
    expect(el).not.toBeNull();
    expect(contractName.innerText.toLocaleUpperCase()).toContain('AP');
  });

  it('check-circle mat icon should be Present', () => {
    const checkcircle = 'check_circle_outline';
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.running'));
    const el: HTMLElement = de[0].nativeElement;
    expect(el.innerText).toContain(checkcircle);
  });

  it('contract-status section should be Present', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.mat-subheading-1'));
    const el: HTMLElement = de[0].nativeElement;
    const contractStatus: Element = el.querySelectorAll('.mat-body-2')[1];
    expect(el).not.toBeNull();
    expect(contractStatus.textContent.toLocaleUpperCase()).toContain('EM CURSO');
  });

  it('contract-amount section should be Present', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.mat-body-1.no-margin'));
    const el: HTMLElement = de[0].nativeElement;
    expect(el).not.toBeNull();
    expect(el.innerText).toContain(new ContractServiceMock().contracts[0].paymentAmmount.toString());
  });

  it('Buttons section should be Present', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.buttons'));
    const el: HTMLElement = de[0].nativeElement;
    expect(el).not.toBeNull();
  });

  it('Button ver detalhe should be Present', () => {
    const b1 = 'VER DETALHE';
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.buttons'));
    const el: HTMLElement = de[0].nativeElement;
    const button: HTMLElement = el.querySelectorAll('button')[0];
    expect(button.innerText.toLocaleUpperCase()).toContain(b1);
  });

  it('Button Avaliar fornecedor should be Present', () => {
    const b2 = 'CONTACTAR FORNECEDOR';
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.buttons'));
    const el: HTMLElement = de[0].nativeElement;
    const button: HTMLElement = el.querySelectorAll('button')[1];
    expect(button.innerText.toLocaleUpperCase()).toContain(b2);
  });

  it('Button Gerir seguro should be Present', () => {
    const b3 = 'GERIR SEGURO';
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.buttons'));
    const el: HTMLElement = de[0].nativeElement;
    const button: HTMLElement = el.querySelectorAll('button')[2];
    expect(button.innerText.toLocaleUpperCase()).toContain(b3);
  });
});
