import { ContractFornecedorInformationComponent } from './contract-fornecedor-information.component';
import { ContractSignatureServiceMock } from '../../../../../core/mocks/contractSignature.service.mock';

describe('ChangeCompanyEquipmentAddressModalComponent', () => {
  let component: ContractFornecedorInformationComponent;
  let service;

  beforeEach(() => {
    service = new ContractSignatureServiceMock();
    component = new ContractFornecedorInformationComponent();
    component.providerInfo = service.contractProviderInfoTestData;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('providerInfo should be null when ngOnDestroy is called', () => {
    component.ngOnDestroy();
    expect(component.providerInfo).toBeNull();
  });

});
