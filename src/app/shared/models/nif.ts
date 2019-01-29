import { SafeResourceUrl } from '@angular/platform-browser';

export class NifContact {
  contactId?: string;
  name?: string;
  email?: string;
  cargo?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  department?: string;
}

export class Nif {
  nif: string;
  companyname: string;
  address: string;
  postalCode: string;
  city: string;
  contacts?: NifContact[] = [];
  sfid?: string;
}

export class NifAttachment {
  public filename: string;
  public fileurl: SafeResourceUrl;

  constructor(filen: string, url: SafeResourceUrl) {
    this.filename = filen;
    this.fileurl = url;
  }
}
