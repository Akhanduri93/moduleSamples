import { Injectable } from '@angular/core';
import { Case, CaseComment, CaseAttachment, CaseCategory, CaseReason } from '../../shared/models/case';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utils } from '../../shared/utils';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Article } from '../../shared/models/article';

@Injectable()
export class CaseService {
  articles: Article[] = [];
  caseComments: CaseComment[];

  constructor(
    private http: HttpClient
  ) { }

  getCases(): Observable<Case[]> {
    const currentAccountId: Account = JSON.parse(Utils.getInfoStorage('currentAccount')).id;
    return this.http.get<Case[]>(
      environment.apiUrl + 'accounts/' + currentAccountId + '/cases',
      { headers: Utils.createAuthorizationHeader() }
    ).pipe(map((cases) => {
      return this.parseCasesResults(cases);
    }
    ))
      .pipe(catchError((error) => {
        throw error;
      }));
  }

  getCaseByCaseId(caseId: String): Observable<Case> {
    const currentAccountId: Account = JSON.parse(Utils.getInfoStorage('currentAccount')).id;
    return this.http.get<Case>(
      environment.apiUrl + 'accounts/' + currentAccountId + '/cases/' + caseId,
      { headers: Utils.createAuthorizationHeader() }
    ).pipe(map((caseJSON) => {
      return this.parseCaseResult(caseJSON);
    }
    ))
      .pipe(catchError((error) => {
        throw error;
      }));
  }

  getAttachments(caseId: String): Observable<CaseAttachment[]> {
    const currentAccountId: Account = JSON.parse(Utils.getInfoStorage('currentAccount')).id;
    return this.http.get<CaseAttachment[]>(
      environment.apiUrl + 'accounts/' + currentAccountId + '/cases/' + caseId + '/attachments',
      { headers: Utils.createAuthorizationHeader() }
    ).pipe(map((attach) => {
      return this.parseAttachments(attach);
    }
    ))
      .pipe(catchError((error) => {
        throw error;
      }));
  }

  sendAttachments(caseId: String, attachment: CaseAttachment) {
    const currentAccountId: Account = JSON.parse(Utils.getInfoStorage('currentAccount')).id;
    const postUrl = environment.apiUrl + 'accounts/' + currentAccountId + '/cases/' + caseId + '/attachments';
    return this.http.post<any>(postUrl, { filename: attachment.filename, filebody: attachment.fileurl }
      , { headers: Utils.createAuthorizationHeader() })
      .pipe(catchError((error) => {
        throw error;
      }));
  }

  getCaseComments(caseId: String): Observable<CaseComment[]> {
    const currentAccountId: Account = JSON.parse(Utils.getInfoStorage('currentAccount')).id;
    return this.http.get<CaseComment[]>(
      environment.apiUrl + 'accounts/' + currentAccountId + '/cases/' + caseId + '/comments',
      { headers: Utils.createAuthorizationHeader() }
    ).pipe(map((caseComments) => {
      return this.parseCaseComments(caseComments);
    }
    ))
      .pipe(catchError((error) => {
        throw error;
      }));
  }

  newCaseComment(caseId: string, commentMessage: string) {
    const currentAccountId: Account = JSON.parse(Utils.getInfoStorage('currentAccount')).id;
    const caseCommentToCreate = new CaseComment(commentMessage);
    const postUrl = environment.apiUrl + 'accounts/' + currentAccountId + '/cases/' + caseId + '/comments';
    return this.http.post<any>(postUrl, { commentbody: caseCommentToCreate.commentBody, createdbyid: caseId },
      { headers: Utils.createAuthorizationHeader() })
      .pipe(catchError((error) => {
        throw error;
      }));
  }

  getCategories() {
    const currentAccountId: Account = JSON.parse(Utils.getInfoStorage('currentAccount')).id;
    const isCustomer: Boolean = JSON.parse(Utils.getInfoStorage('currentAccount')).isCustomer;
    let channel;
    if (isCustomer) {
      channel = 'client';
    } else {
      channel = 'partner';
    }
    return this.http.get<any>(
      environment.apiUrl + 'accounts/' + currentAccountId + '/cases/categories/' + channel,
      { headers: Utils.createAuthorizationHeader() }
    ).pipe(map((categories) => {
      return this.parseCategories(categories);
    }
    ))
      .pipe(catchError((error) => {
        throw error;
      }));
  }

  getArticlesByCategory(category: string) {
    const isCustomer: Boolean = JSON.parse(Utils.getInfoStorage('currentAccount')).isCustomer;
    let channel;
    if (isCustomer) {
      channel = 'client';
    } else {
      channel = 'partner';
    }
    return this.http.get<any>(
      environment.apiUrl + 'articles/pt/' + channel,
      { headers: Utils.createAuthorizationHeader() }
    ).pipe(map((articles) => {
      return this.parseArticles(articles, category);
    }
    ))
      .pipe(catchError((error) => {
        throw error;
      }));
  }

  postNewCase(caseToCreate: Case) {
    const currentAccountId: Account = JSON.parse(Utils.getInfoStorage('currentAccount')).id;
    const postUrl = environment.apiUrl + 'accounts/' + currentAccountId + '/cases';
    return this.http.post<any>(postUrl, {
      type: caseToCreate.type, category__c: caseToCreate.category,
      reason__c: caseToCreate.reason, description: caseToCreate.message, contactemail: caseToCreate.contactEmail
    },
      { headers: Utils.createAuthorizationHeader() })
      .pipe(catchError((error) => {
        throw error;
      }));

  }

  parseArticles(articles, categoryToSearch?: string): Array<Article> {
    const articlesToBeRetrieved = new Array();
    let articleCategoryList = [];
    articles.forEach(function (element) {
      const article = new Article();
      article.urlName = element['urlName'];
      article.title = element['title'];
      articleCategoryList = element['categoriesList'];

      if (categoryToSearch !== undefined) {
        const index = articleCategoryList.findIndex(category => category === categoryToSearch);
        if (index !== -1) {
          articlesToBeRetrieved.push(article);
        }
      } else {
        articlesToBeRetrieved.push(article);
      }
    }, this);
    return articlesToBeRetrieved;
  }

  parseCategories(categories): Array<CaseCategory> {
    const categoriesToBeRetrieved = new Array();
    categories.forEach(function (element) {

      const cat = new CaseCategory(element['category']);
      const reasonOfCat = new CaseReason(element['reason']);
      cat.reasonOfCategory = reasonOfCat;
      categoriesToBeRetrieved.push(cat);
    }, this);
    return categoriesToBeRetrieved;
  }

  parseCasesResults(casesRetrieved): Array<Case> {
    const cases = new Array();
    casesRetrieved.cases.forEach((casesRet) => {

      const c = new Case(casesRet.type, casesRet.category__c, casesRet.reason__c, casesRet.description, casesRet.contactemail);
      c.id = casesRet.id;
      c.caseNumber = casesRet.casenumber;
      c.priority = casesRet.priority;
      c.createdDate = casesRet.createddate;
      c.status = this.parseCaseStatus(casesRet.status);
      c.attributedTo = casesRet.attributedTo;
      cases.push(c);
    });
    return cases;
  }


  parseCaseStatus(caseStatus: string) {
    caseStatus = caseStatus.trim();
    switch (caseStatus) {
      case 'New': { return 'Novo'; }
      case 'Working': { return 'Em análise'; }
      case 'Escalated': { return 'Em análise superior'; }
      case 'Closed': { return 'Fechado'; }
    }
  }

  parseCaseResult(caseJSON): Case {
    const caseRetrieved = caseJSON.case;
    const caseParsed = new Case(caseRetrieved.type, caseRetrieved.category__c,
    caseRetrieved.reason__c, caseRetrieved.description, caseRetrieved.contactemail);
    caseParsed.id = caseRetrieved.id;
    caseParsed.caseNumber = caseRetrieved.casenumber;
    caseParsed.priority = caseRetrieved.priority;
    caseParsed.createdDate = caseRetrieved.createddate;
    caseParsed.status = this.parseCaseStatus(caseRetrieved.status);
    caseParsed.attributedTo = caseRetrieved.attributedTo;

    return caseParsed;
  }

  parseAttachments(attachments): Array<CaseAttachment> {
    const casesAttachments = new Array();
    const attachmentsRetrieved = attachments.attachs;
    attachmentsRetrieved.forEach((attach) => {

      const ca = new CaseAttachment(attach.filename, attach.fileurl);
      casesAttachments.push(ca);
    });

    return casesAttachments;
  }

  parseCaseComments(caseCommentsPayload): Array<CaseComment> {
    const caseComments = new Array();
    const currentAccount = JSON.parse(Utils.getInfoStorage('currentAccount'));
    const userName = currentAccount.contact.name;
    caseCommentsPayload.data.forEach((comm) => {
      const cc = new CaseComment(comm.commentbody);
      cc.id = comm.id;
      cc.createdDate = comm.createddate;
      if (comm.author.includes('Guest') || comm.author === 'Integration User') {
        cc.author = userName;
      } else {
        cc.author = comm.author;
      }
      cc.createdById = comm.parentid;
      caseComments.push(cc);
    });

    return caseComments;
  }


}


