export class Client {
    clientId?: string;
    name: string;
    email?: string;
    phoneNumber?: string;
    nif: string;
    street: string;
    num: string;
    floor: string;
    postalCode: string;
    city: string;
    country: string;
}

export class Equipment {
    id?: string;
    description?: string;
    street: string;
    num: string;
    floor: string;
    postalCode: string;
    city: string;
    country: string;
}

export class Vendor {
    providerId?: string;
    name: string;
    email?: string;
    mobilephone?: string;
    nif: string;
    street: string;
    num: string;
    floor: string;
    postalCode: string;
    city: string;
    country: string;
}

export class Address {
    street: string;
    num: string;
    floor: string;
    code: string;
    city: string;
    country: string;
}

export class Decline {
    reason: string;
    comment: string;
}

export class Sign {
    signerName: string;
    signerPhone: string;
    street: string;
    nif: string;
    phone: string;
    postalCode: string;
    city: string;
}

export class Application {
    id: number;
    name: string;
    paymentAmount: number;
    paymentFrequency: string;
    paymentMethod: string;
    paymentTiming: string;
    term: string;
}

export class PersonalGuarantee {
    city: string;
    mobile: string;
    name: string;
    nif: string;
    postalCode: string;
    street: string;
}

export class Rent {
    monthly: 0;
    quarterly: 0;
}


export class Signer {
    name: string;
    phone: string;
}

export class ContractSignature {
    application: Application;
    rents: Rent;
    client: Client;
    vendor: Vendor;
    declinedReasons: Array<string>;
    personalGuarantee: PersonalGuarantee;
    signer: Signer;
    constructor(
        applicationInfo: Application,
        rentsInfo: Rent,
        clientInfo: Client,
        vendorInfo: Vendor,
        declinedReasons: Array<string>,
        personalGuaranteeInfo: PersonalGuarantee,
        signer: Signer) {
        this.application = applicationInfo;
        this.rents = rentsInfo;
        this.client = clientInfo;
        this.vendor = vendorInfo;
        this.declinedReasons = declinedReasons;
        this.personalGuarantee = personalGuaranteeInfo;
        this.signer = signer;
    }
}
