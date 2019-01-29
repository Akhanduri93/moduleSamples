import { SafeResourceUrl } from '@angular/platform-browser';

export class Case {
  public id?: string;
  public caseNumber?: string;
  public priority?: string;
  public createdDate?: string;
  public status?: string;
  public attributedTo?: string;

  public type: string;
  public category: string;
  public reason: string;
  public message: string;
  public contactEmail: string;

  public attachments?: CaseAttachment[];
  public comments?: CaseComment[];

  constructor(ty: string, cat: string, res: string, mes: string, contactEmail: string) {
    this.type = ty;
    this.category = cat;
    this.reason = res;
    this.message = mes;
    this.contactEmail = contactEmail;
  }
}

export class CaseComment {
  public id: string;
  public author: string;
  public createdById: string;
  public createdDate: string;
  public commentBody: string;

  constructor( commentBody: string) {
    this.commentBody = commentBody;
  }
}

export class CaseAttachment {
  public filename: string;
  public fileurl: SafeResourceUrl;

  constructor(filen: string, url: SafeResourceUrl) {
    this.filename = filen;
    this.fileurl = url;
  }
}

export class CaseCategory {
  public categoryName: string;
  public reasonOfCategory: CaseReason;

  constructor(cat: string) {
    this.categoryName = cat;
  }
}


export class CaseReason {
  public reasons: string[];

  constructor(res: string[]) {
    this.reasons = res;
  }

}
