import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LOCALE_ID } from '@angular/core';
import { PaymentInformationComponent } from './payment-information.component';
import { InvoiceServiceMock } from '../../../../core/mocks/invoice.service.mock';
import { AppMaterialModule } from '../../../../shared/app-material.module';
import { MyPipesModule } from '../../../../shared/pipes/myPipes.module';
import { SharedModule } from '../../../../shared/shared.module';
import { CurrencyFormat } from '../../../../shared/pipes/currency.pipe';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePtPt from '@angular/common/locales/pt-PT';
import { FinancialService } from '../../../../core/http/financial.service';
import { FinancialServiceMock } from '../../../../core/mocks/financial-status.service.mock';
import { LoadingService } from '../../../../core/services/loading.service';
import { LoadingServiceMock } from '../../../../core/mocks/loading.service.mock';
registerLocaleData(localePtPt);

describe('Payment Information Component Spec', () => {
  let component: PaymentInformationComponent;
  let fixture: ComponentFixture<PaymentInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, MyPipesModule, SharedModule],
      declarations: [PaymentInformationComponent],
      providers: [
        InvoiceServiceMock,
        { provide: FinancialService, useClass: FinancialServiceMock },
        { provide: LoadingService, useClass: LoadingServiceMock },
        { provide: LOCALE_ID, useValue: 'pt-PT' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Next payment section if present should have title and title should be spelled correctly', () => {
    component.setSubCards();
    component.subCards.set('nextInvoices', true);
    fixture.detectChanges();
    const deNextPaymentTitle = fixture.debugElement.queryAll(By.css('h3'));
    const elNextPaymentTitle: HTMLElement = deNextPaymentTitle[0].nativeElement;
    expect(elNextPaymentTitle.innerText).toContain('Próximas Rendas');
  });

  it('Next payment section if present should have next payment date, next payment amount and contract id section', () => {
    component.setSubCards();
    component.subCards.set('nextInvoices', true);
    const myInvoice = new InvoiceServiceMock().getInvoiceTest()[0];
    const myDate = myInvoice.dueDate.toString();
    const ammount = myInvoice.total;
    const applicationNumber = myInvoice.applicationNumber;
    fixture.detectChanges();
    const dePayDate = fixture.debugElement.queryAll(By.css('.mat-body-2'));
    const elPayDate: HTMLElement = dePayDate[0].nativeElement;
    expect(elPayDate).not.toBeNull();
    expect(elPayDate.innerText).toContain(new DatePipe('pt-PT').transform(myDate, 'dd MMM yyyy'));

    const dePayAmount = fixture.debugElement.queryAll(By.css('.mat-subheading-2'));
    const elPayAmount: HTMLElement = dePayAmount[0].nativeElement;
    expect(elPayAmount).not.toBeNull();

    const dePayApplicationId = fixture.debugElement.queryAll(By.css('.mat-caption'));
    const elPayApplicationId: HTMLElement = dePayApplicationId[0].nativeElement;
    expect(elPayApplicationId).not.toBeNull();
    expect(elPayApplicationId.innerText).toContain(applicationNumber);
  });
});
