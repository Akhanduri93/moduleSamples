import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ContractsComponent } from './contracts.component';
import { FinancialStatusComponent } from '../../components/financial-status/financial-status.component';
import { PaymentInformationComponent } from '../../components/payment-information/payment-information.component';
import { AccountServiceMock } from '../../../../core/mocks/account.service.mock';
import { FinancialServiceMock } from '../../../../core/mocks/financial-status.service.mock';
import { AccountService } from '../../../../core/http/account.service';
import { FinancialService } from '../../../../core/http/financial.service';
import { StorageMock } from '../../../../core/mocks/storage.mock';
import { LoadingService } from '../../../../core/services/loading.service';
import { ContractsTableComponent } from '../../components/contracts-table/contracts-table.component';
import { SimulatorComponent } from '../../components/simulator/simulator.component';
import { StarRatingComponent } from '../../components/star-rating/star-rating.component';
import { AppMaterialModule } from '../../../../shared/app-material.module';
import { MyPipesModule } from '../../../../shared/pipes/myPipes.module';
import { RouterTestingModule } from '@angular/router/testing';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ContractService } from '../../../../core/http/contract.service';
import { ContractServiceMock } from '../../../../core/mocks/contract.service.mock';
import {LatePaymentsComponent} from '../../../../shared/components/late-payments/late-payments.component';

describe('ContractsComponent', () => {
    let component: ContractsComponent;
    let fixture: ComponentFixture<ContractsComponent>;
    const storageMock = new StorageMock();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([]),
                AppMaterialModule,
                MyPipesModule
            ],
            declarations: [
                ContractsComponent,
                ContractsTableComponent,
                FinancialStatusComponent,
                PaymentInformationComponent,
                SimulatorComponent,
                StarRatingComponent,
                CardComponent,
                LatePaymentsComponent
            ],
            providers: [
                { provide: ContractService, useClass: ContractServiceMock },
                { provide: AccountService, useClass: AccountServiceMock },
                { provide: FinancialService, useClass: FinancialServiceMock },
                LoadingService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContractsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        storageMock.setLocalStorage();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have Payment Information card', () => {
        fixture.detectChanges();
        const de = fixture.debugElement.query(By.css('app-payment-information'));
        const el: HTMLElement = de.nativeElement;
        expect(el.tagName.toLocaleLowerCase()).toContain('app-payment-information');
    });

    it('should have title of the table Contracts', () => {
        fixture.detectChanges();
        const de = fixture.debugElement.query(By.css('.out-title'));
        const el: HTMLElement = de.nativeElement;
        expect(el.innerText.toLowerCase()).toContain('Contratos'.toLowerCase());
    });

    it('should have Financial Status card', () => {
        const de = fixture.debugElement.query(By.css('app-financial-status'));
        const el: HTMLElement = de.nativeElement;
        expect(el.tagName.toLocaleLowerCase()).toContain('app-financial-status');
    });

    it('Simulator section should be Present', () => {
        fixture.detectChanges();
        const de = fixture.debugElement.queryAll(By.css('app-card'));
        const el: HTMLElement = de[3].nativeElement;
        expect(el).not.toBeNull();
        expect(el.textContent).toContain('Simulador');
    });

    it('should have Payment Late information component', () => {
        fixture.detectChanges();
        const de = fixture.debugElement.query(By.css('app-late-payments'));
        const el: HTMLElement = de.nativeElement;
        expect(el).not.toBeNull();
    });
});
