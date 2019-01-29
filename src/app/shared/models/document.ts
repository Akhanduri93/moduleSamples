export class DocumentStatus {
    constructor(
        public id: string,
        public appName: string,
        public status: string,
        public creationDate: Date,
        public sentDate: Date,
        public statusDate: Date,
        public timezone: string,
        public vendor: Vendor,
        public signers: Signer[],
        ) { }
}

export class Signer {
    constructor(
        public accountId: string,
        public recipientId: string,
        public email: string,
        public name: string,
        public description: string,
        public ipAdress: string,
        public timestamp: Date
    ) { }
}

export class Vendor {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public description: string
    ) { }
}
