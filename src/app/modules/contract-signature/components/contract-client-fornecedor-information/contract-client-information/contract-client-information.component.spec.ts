import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractClientInformationComponent } from './contract-client-information.component';
import { By } from '@angular/platform-browser';
import { AppMaterialModule } from '../../../../../shared/app-material.module';
import { CardComponent } from '../../../../../shared/components/card/card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContractSignatureServiceMock } from '../../../../../core/mocks/contractSignature.service.mock';
import { CurrencyFormat } from '../../../../../shared/pipes/currency.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ContractFornecedorComponent', () => {
  let component: ContractClientInformationComponent;
  let fixture: ComponentFixture<ContractClientInformationComponent>;
  let testService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContractClientInformationComponent, CardComponent, CurrencyFormat],
      imports: [BrowserAnimationsModule, AppMaterialModule, FlexLayoutModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    testService = new ContractSignatureServiceMock();
    fixture = TestBed.createComponent(ContractClientInformationComponent);
    component = fixture.componentInstance;
    component.clientInfo = testService.contractClientInfoTestData;
    component.equipmentInfo = testService.contractEquipmentInfoTestData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the mat-checkbox for the equipment address information', () => {
    const equipmentAddressElement = fixture.debugElement.query(By.css('mat-checkbox'));
    expect(equipmentAddressElement).not.toBeNull();
  });

  it('should show the equipment address information when showPanel is false', () => {
    component.showPanel = false;
    fixture.detectChanges();
    const equipmentAddressElement = fixture.debugElement.queryAll(By.css('h3'))[3].nativeElement;
    expect(equipmentAddressElement.innerText).toContain(component.equipmentInfo.street);
    expect(equipmentAddressElement.innerText).toContain(component.equipmentInfo.num);
    expect(equipmentAddressElement.innerText).toContain(component.equipmentInfo.floor);
    expect(equipmentAddressElement.innerText).toContain(component.equipmentInfo.country);
    expect(equipmentAddressElement.innerText).toContain(component.equipmentInfo.postalCode);
    expect(equipmentAddressElement.innerText).toContain(component.equipmentInfo.city);
  });

  it('should show the client information component', () => {
    const clientNameElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(clientNameElement.innerText).toBe(component.clientInfo.name);

    const de = fixture.debugElement.queryAll(By.css('h3'));
    const clientNifElement: HTMLElement = de[0].nativeElement;
    expect(clientNifElement.innerText).toBe(component.clientInfo.nif);

    const clientCompanyAddressElement: HTMLElement = de[1].nativeElement;
    expect(clientCompanyAddressElement.innerText).toContain(component.clientInfo.street);
    expect(clientCompanyAddressElement.innerText).toContain(component.clientInfo.num);
    expect(clientCompanyAddressElement.innerText).toContain(component.clientInfo.floor);
    expect(clientCompanyAddressElement.innerText).toContain(component.clientInfo.country);
  });

});
