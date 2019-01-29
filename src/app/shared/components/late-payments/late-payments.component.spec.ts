import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LOCALE_ID } from '@angular/core';
import { LatePaymentsComponent } from './late-payments.component';
import { InvoiceServiceMock } from '../../../core/mocks/invoice.service.mock';
import { PaymentInformationServiceMock } from '../../../core/mocks/payment-information.service.mock';
import { AppMaterialModule } from '../../app-material.module';
import { MyPipesModule } from '../../pipes/myPipes.module';
import { SharedModule } from '../../shared.module';
import { CurrencyFormat } from '../../pipes/currency.pipe';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePtPt from '@angular/common/locales/pt-PT';
import { FinancialService } from '../../../core/http/financial.service';
import {IbanPipe} from '../../pipes/iban.pipe';
import {RouterTestingModule} from '@angular/router/testing';
registerLocaleData(localePtPt);

describe('Invoices and Payment Information Component Spec', () => {
  let component: LatePaymentsComponent;
  let fixture: ComponentFixture<LatePaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, MyPipesModule, SharedModule, RouterTestingModule],
      declarations: [],
      providers: [
        InvoiceServiceMock,
        { provide: FinancialService, useClass: PaymentInformationServiceMock },
        { provide: LOCALE_ID, useValue: 'pt-PT' }
      ]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('if late payment is not valid than delay payment section should not be present', () => {
    component.hasLatePayment = false;
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.payment-info'));
    expect(de).toEqual([]);
  });


  it('if late payment is valid than delay payment warning section should be present', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.payment-info'));
    const el: HTMLElement = de[0].nativeElement;
    expect(el).not.toBeNull();
  });

  it('if late payment is valid than payment delayed section should show error_outline icon with status with payment name', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.payment-delayed'));
    const el: HTMLElement = de[0].nativeElement;
    expect(el).not.toBeNull();
    expect(el.innerText).toContain('error_outline');
    const name = component.invoices[0].name;
    const deStatus = fixture.debugElement.queryAll(By.css('.mat-body-1'));
    const elStatus: HTMLElement = deStatus[0].nativeElement;
    expect(elStatus.innerText).toContain(name);
  });

  it('if late payment is valid then delay payment amount section should show component delayed payment value that is the same' +
      ' as the invoice name', () => {
    fixture.detectChanges();
    const currencyPipe = new CurrencyFormat();
    const transformedAmt = currencyPipe.transform(component.invoices[0].amount);
    const de = fixture.debugElement.queryAll(By.css('.delay-payment-amount'));
    const el: HTMLElement = de[0].nativeElement;
    expect(el).not.toBeNull();
    expect(el.innerText).toContain(transformedAmt);
  });

  it('if late payment is valid then date container should have both label and a transformed date that is equal' +
      ' to the invoice date', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.date-container'));
    const label = de[0].queryAll(By.css('.mat-caption'));
    const date = de[0].queryAll(By.css('h4'));
    const datePipe = new DatePipe('pt-PT');
    const transFormedDate = datePipe.transform(component.invoices[0].dueDate, 'dd MMM yyyy');
    expect(date[0].nativeElement.innerText).toContain(transFormedDate);
    expect(label[0].nativeElement.innerText).toContain('Data limite de pagamento');
  });

  it('if late payment is valid then there should be a button for toggling the mb reference', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.mat-stroked-button'));
    const el: HTMLElement = de[0].nativeElement;
    expect(el).not.toBeNull();
  });

  it('if late payment is valid then after toggling the mb reference we should have a entity, reference and amount', () => {
    component.onToggleMBReference(0);
    fixture.detectChanges();
    const entity = fixture.debugElement.query(By.css('.mb-entity'));
    const reference = fixture.debugElement.query(By.css('.mb-reference'));
    const amount = fixture.debugElement.query(By.css('.mb-amount'));
    const mbReferencePipe = new IbanPipe();
    const currencyFormat = new CurrencyFormat();
    const transformedComponentReference = mbReferencePipe.transform(component.invoices[0].reference);
    const transformedComponentAmount = currencyFormat.transform(component.invoices[0].amount);
    expect(entity.nativeElement.innerText).toContain(component.invoices[0].entity);
    expect(reference.nativeElement.innerText).toContain(transformedComponentReference);
    expect(amount.nativeElement.innerText).toContain(transformedComponentAmount);
  });

  it('if late payment is valid and invoices is greater that its default then we check if more button is there' +
      ' and has right icon applied', () => {
    fixture.detectChanges();
    const moreButton = fixture.debugElement.query(By.css('.more-button'));
    const el: HTMLElement = moreButton.nativeElement;
    const icon = moreButton.queryAll(By.css('.mat-icon'));
    expect(el).not.toBeNull();
    expect(icon[0].nativeElement.innerText).toContain('expand_more');
  });

  it('if late payment is valid and invoices is greater that its default then we toggle on and off the more button' +
      ' to check if interactions are ok', () => {
    fixture.detectChanges();
    const moreButton = fixture.debugElement.query(By.css('.more-button'));
    let icon = moreButton.queryAll(By.css('.mat-icon'));
    // Now we Click to see the expand less button and check if invoices.length === invoicesCurrentLimit
    icon[0].nativeElement.click();
    fixture.detectChanges();
    icon = moreButton.queryAll(By.css('.mat-icon'));
    expect(component.invoicesCurrentLimit).toEqual(component.invoices.length);
    expect(icon[0].nativeElement.innerText).toContain('expand_less');
    // Now we Click to see the expand more button again and check if invoicesDefaultLimit === invoicesCurrentLimit
    icon[0].nativeElement.click();
    fixture.detectChanges();
    icon = moreButton.queryAll(By.css('.mat-icon'));
    expect(icon[0].nativeElement.innerText).toContain('expand_more');
    expect(component.invoicesCurrentLimit).toEqual(component.invoicesDefaultLimit);
  });

});
