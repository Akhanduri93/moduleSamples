import { Contract, ContractActivity } from '../../shared/models/contract';
import { Observable, of } from 'rxjs';

export class ContractServiceMock {
  contracts: Contract[] = [
    {
      rentingApplicationId: 3,
      rentingApplicationName: 'AP-015839',
      financeNumber: '56888100',
      clientId: '0010E00000KMoDOQA1',
      paymentMethod: 'Direct Debit',
      paymentAmmount: 159,
      paymentFrequency: 'Trimestral',
      contractStatus: 'running',
      deliverySignedDate: '19 Jan 2018',
      contractDuration: '60',
      vendorName: 'VERDINCÓGNITO, UNIPESSOAL, LDA',
      vendorPostalCode: '9899-568',
      vendorBillingCity: 'Lisbon',
      vendorStreet: 'Rua das Coisas Verdes'
    },
    {
      rentingApplicationId: 3,
      rentingApplicationName: 'AP-015839',
      financeNumber: '56888100',
      clientId: '0010E00000KMoDOQA1',
      paymentMethod: 'Direct Debit',
      paymentAmmount: 159,
      paymentFrequency: 'Trimestral',
      contractStatus: 'running',
      deliverySignedDate: '19 Jan 2018',
      contractDuration: '60',
      vendorName: 'VERDINCÓGNITO, UNIPESSOAL, LDA',
      vendorPostalCode: '9899-568',
      vendorBillingCity: 'Lisbon',
      vendorStreet: 'Rua das Coisas Verdes'
    }
  ];

  contract: Contract = {
    rentingApplicationId: 3,
    rentingApplicationName: 'AP-015839',
    financeNumber: '56888100',
    clientId: '0010E00000KMoDOQA1',
    paymentMethod: 'Direct Debit',
    paymentAmmount: 159,
    paymentFrequency: 'Trimestral',
    deliverySignedDate: '19 Jan 2018',
    contractStatus: 'running',
    contractDuration: '60',
    vendorName: 'VERDINCÓGNITO, UNIPESSOAL, LDA',
    vendorPostalCode: '9899-568',
    vendorBillingCity: 'Lisbon',
    vendorStreet: 'Rua das Coisas Verdes'
  };

  activities: Array<ContractActivity> = [{
    activity: 'awd',
    date: new Date(),
    description: 'awda',
    email: 'awd',
    ipAdress: 'awd',
    name : 'awd',
    subject: 'Confirmação de Entrega'
  }];

  getContract(id): Observable<Contract> {
    return of(this.contract);
  }

  getContractDetails(id) {
    const contractDetails = { account: null, application: this.contract, insurance: null };
    return of(contractDetails);
  }

  getContracts(): Observable<Contract[]> {
    return of(this.contracts);
  }

  getContractSignActivities() {
    return of(this.activities);
  }
}
