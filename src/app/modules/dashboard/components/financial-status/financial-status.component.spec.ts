import { async, ComponentFixture, TestBed, } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FinancialStatusComponent } from './financial-status.component';
import { AccountServiceMock } from '../../../../core/mocks/account.service.mock';
import { AppMaterialModule } from '../../../../shared/app-material.module';
import { MyPipesModule } from '../../../../shared/pipes/myPipes.module';
import { CurrencyFormat } from '../../../../shared/pipes/currency.pipe';
import { AccountService } from '../../../../core/http/account.service';
import { CardComponent } from '../../../../shared/components/card/card.component';

describe('FinancialStatusComponent Integration', () => {
  let component: FinancialStatusComponent;
  let fixture: ComponentFixture<FinancialStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppMaterialModule,
        MyPipesModule
      ],
      declarations: [
        FinancialStatusComponent,
        CardComponent
      ],
      providers: [
        { provide: AccountService, useClass: AccountServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render creditline', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.mat-headline'));
    const el: HTMLElement = de[0].nativeElement;
    const currencyPipe = new CurrencyFormat();
    const transformedAmt = currencyPipe.transform(component.account.creditLine);
    expect(el.innerText).toContain(transformedAmt);
  });

  it('should render usedCredit', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.mat-body-1'));
    const el: HTMLElement = de[0].nativeElement;
    const currencyPipe = new CurrencyFormat();
    const transformedAmt = currencyPipe.transform(component.account.usedCredit);
    expect(el.innerText).toContain(transformedAmt);
  });

  it('should have material progress bar', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('mat-progress-bar'));
    const el: HTMLElement = de[0].nativeElement;
    expect(el).not.toBeNull();
  });
});
