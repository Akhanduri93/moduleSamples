import { Contract } from './contract';

export class CompanyPaymentDetail {
    id?: string;
    ibanName?: string;
    ibanNumber?: string;
    ibanContracts: Contract[] = [];
    ibanBankImage?: string;
}
