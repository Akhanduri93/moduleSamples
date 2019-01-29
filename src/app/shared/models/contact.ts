export class Contact {
    contactId: string;
    name: string;
    email: string;
    mobilePhone?: string;
    nif?: string;
    street?: string;
    postalCode?: string;
    city?: string;
    contactPrivileges?: string;
    username?: string;
    role?: string;
    isDeleted?: boolean;
    sendInvoice?: boolean;

    constructor(id: string, name: string, email: string) {
        this.contactId = id;
        this.name = name;
        this.email = email;
      }
}
