export class Contract {
    rentingApplicationId: number;
    rentingApplicationName: string;
    financeNumber: string;
    clientId: string;
    paymentMethod: string;
    paymentAmmount: number;
    paymentFrequency: string;
    deliverySignedDate?: string;
    contractStatus: string;
    contractDuration: string;
    vendorName: string;
    vendorPostalCode?: string;
    vendorBillingCity?: string;
    vendorStreet?: string;

    constructor(id: number,
        rentingAppName: string,
        financeNumber: string,
        clientId: string,
        paymentMethod: string,
        paymentAmmount: number,
        paymentFrequency: string,
        deliverySignedDate: string,
        contractStatus: string,
        contractTerm: string,
        vendorName: string) {
        this.rentingApplicationId = id;
        this.rentingApplicationName = rentingAppName;
        this.financeNumber = financeNumber;
        this.clientId = clientId;
        this.paymentMethod = paymentMethod;
        this.paymentAmmount = paymentAmmount;
        this.paymentFrequency = paymentFrequency;
        this.deliverySignedDate = deliverySignedDate;
        this.contractStatus = contractStatus;
        this.contractDuration = contractTerm;
        this.vendorName = vendorName;
    }
}

export class ContractActivity {
    constructor(
        public activity: string,
        public name: string,
        public email: string,
        public subject: string,
        public description: string,
        public date: Date,
        public ipAdress: string) { }
}

export class ContractAttachment {
    constructor(
        public application_id,
        public created_at,
        public id,
        public link,
        public name,
        public type) { }

}
