import { Invoice } from './invoice';
import { CompanyPaymentDetail } from './company-payment-detail';
import { AccountPaymentActivity } from './account-payment-activity';

export class Account {
  id: string;
  name: string;
  financialNumber: string;
  phone: string;
  street: string;
  postalCode: string;
  city: string;
  iban: string;
  countryCode: string;
  creditLine = 0;
  usedCredit = 0;
  availableCredit = 0;

  paymentMethod?: string;
  payRefString?: string;
  upcomingInvoices?: Invoice[];
  companyPaymentDetails?: CompanyPaymentDetail[];
  paymentActivity?: AccountPaymentActivity[];

  companyLogo?: string;
  companyLogoFileName?: string;
  companyLogoFileBody?: string;

  // FIELDS TO REMOVE
  nextRent?: {
    amount: string,
    date: number
  };

  constructor(id: string, name: string, financialNumber: string, phone: string, city: string, street: string,
    postalCode: string, creditLine: number, availableCredit: number, usedCredit: number, iban: string, countryCode: string) {
    this.id = id;
    this.name = name;
    this.financialNumber = financialNumber;
    this.phone = phone;
    this.city = city;
    this.street = street;
    this.postalCode = postalCode;
    this.creditLine = creditLine;
    this.availableCredit = availableCredit;
    this.usedCredit = usedCredit;
    this.iban = iban;
    this.countryCode = countryCode;
  }
}

