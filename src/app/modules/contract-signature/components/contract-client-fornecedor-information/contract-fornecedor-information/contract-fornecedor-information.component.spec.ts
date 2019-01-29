import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractSignatureServiceMock } from '../../../../../core/mocks/contractSignature.service.mock';
import { ContractFornecedorInformationComponent } from './contract-fornecedor-information.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { AppMaterialModule } from '../../../../../shared/app-material.module';

describe('ContractFornecedorInformationComponent', () => {
  let component: ContractFornecedorInformationComponent;
  let fixture: ComponentFixture<ContractFornecedorInformationComponent>;
  let testService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractFornecedorInformationComponent ],
      imports: [BrowserAnimationsModule, AppMaterialModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    testService = new ContractSignatureServiceMock();
    fixture = TestBed.createComponent(ContractFornecedorInformationComponent);
    component = fixture.componentInstance;
    component.providerInfo = testService.contractProviderInfoTestData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have svg image', () => {
    const de = fixture.debugElement.query(By.css('svg')).nativeElement;
    expect(de).not.toBeNull();
  });

  it('should show the provider information component', () => {
    const providerNameElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(providerNameElement.innerText).toBe(component.providerInfo.name);
    const de = fixture.debugElement.queryAll(By.css('h3'));
    const providerNifElement: HTMLElement = de[0].nativeElement;
    expect(providerNifElement.innerText).toBe(component.providerInfo.nif);
    const providerAddressElement: HTMLElement = de[1].nativeElement;
    expect(providerAddressElement.innerText).toContain(component.providerInfo.street);
  });
});
