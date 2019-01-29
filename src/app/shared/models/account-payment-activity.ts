import { Invoice } from './invoice';

export class AccountPaymentActivity {
    id: string;
    type: string;
    message: string;
    icon?: string;
    status?: string;
    invoice?: Invoice[];
    method?: string;
    invoiceNumber?: string;
    invoiceAmount?: string;
    statusText?: string;
    date?: string;
    invoiceFile?: any;
    invoiceFileName?: string;
}
