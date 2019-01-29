// This class is used for CreditNotes and Invoices
export class Activity {
    type: string;
    createdDate: string;
    message: string;

    total?: string;
    status?: string;
    external_number?: string;
    link?: string;

    constructor(type: string, createdDate: string, message: string) {
        this.type = type;
        this.message = message;
        this.createdDate = createdDate;
    }
}
