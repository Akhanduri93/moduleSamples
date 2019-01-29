import { Attachment } from './attachment';

export class Invoice {
    public id: string;
    public applicationNumber: string;
    public period: string;
    public createdDate: string;
    public dueDate: string;
    public total: string;
    public status: string;
    public objectName?: string;
    public paymentMethod?: string;
    public unparsedDate?: Date;
    public attachment?: Attachment;

    constructor(invoiceId: string,
        applicationNumber: string,
        period: string,
        createdDate: string,
        endDate: string,
        ammount: string,
        contractStatus: string) {
        this.id = invoiceId;
        this.applicationNumber = applicationNumber;
        this.period = period;
        this.createdDate = createdDate;
        this.dueDate = endDate;
        this.total = ammount;
        this.status = contractStatus;
    }
}

