import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utils } from '../../shared/utils';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Contact } from '../../shared/models/contact';

@Injectable()
export class ContactService {
  constructor(
    private http: HttpClient
  ) { }

  getContacts(): Observable<Contact[]> {
    const currentAccountId: Account = JSON.parse(Utils.getInfoStorage('currentAccount')).id;
    return this.http.get<Contact[]>(
      environment.apiUrl + 'accounts/' + currentAccountId + '/contacts',
      { headers: Utils.createAuthorizationHeader() }
    ).pipe(map((contactReceived) => {
      return this.parseContactResults(contactReceived);
    }
    ))
      .pipe(catchError((error) => {
        throw error;
      }));
  }

  getContactById(): Observable<Contact> {
    const currentAccountId: Account = JSON.parse(Utils.getInfoStorage('currentAccount')).id;
    const currentContactId = JSON.parse(Utils.getInfoStorage('currentAccount')).contact.id;
    return this.http.get<Contact>(
      environment.apiUrl + 'accounts/' + currentAccountId + '/contact/' + currentContactId,
      { headers: Utils.createAuthorizationHeader() }
    ).pipe(map((contactReceived) => {
      return this.parseContactResult(contactReceived);
    }
    ))
      .pipe(catchError((error) => {
        throw error;
      }));
  }

  putContactData(contactToUpdate: Contact) {
    const currentAccountId: Account = JSON.parse(Utils.getInfoStorage('currentAccount')).id;
    const currentContactId = JSON.parse(Utils.getInfoStorage('currentAccount')).contact.id;
    const postUrl = environment.apiUrl + 'accounts/' + currentAccountId + '/contact/' + currentContactId;
    const splitedName = contactToUpdate.name.split(/ (.+)/);
    const firstname = splitedName[0];
    let lastname = '';
    if (splitedName.length > 1) {
      lastname = splitedName[1];
    }
  let sendInvoice = 'false';
  if (contactToUpdate.sendInvoice === true) {
    sendInvoice = 'true';
  }

    return this.http.put<any>(postUrl, {
      id: contactToUpdate.contactId, firstName: firstname, lastName: lastname,
      email: contactToUpdate.email, mobilephone: contactToUpdate.mobilePhone,
      nif__c: String(contactToUpdate.nif), mailingstreet: contactToUpdate.street,
      mailingpostalcode: contactToUpdate.postalCode, mailingcity: contactToUpdate.city,
      send_invoice__c: sendInvoice
    },
      { headers: Utils.createAuthorizationHeader() })
      .pipe(catchError((error) => {
        throw error;
      }));
  }

  parseContactResult(contact): Contact {
    const contactRetrieved = contact;
    const fullName = contact.firstname + ' ' + contact.lastname;
    const contactParsed = new Contact(contactRetrieved.id, fullName,
      contactRetrieved.email);
    contactParsed.mobilePhone = contactRetrieved.mobilephone;
    contactParsed.nif = contactRetrieved.nif__c;
    contactParsed.postalCode = contactRetrieved.mailingpostalcode;
    contactParsed.street = contactRetrieved.mailingstreet;
    contactParsed.city = contactRetrieved.mailingcity;
    contactParsed.role = contactRetrieved.role__c;
    contactParsed.sendInvoice = contactRetrieved.send_invoice__c;
    contactParsed.isDeleted = contactRetrieved.isdeleted;

    return contactParsed;
  }

  parseContactResults(contactsRetrieved): Array<Contact> {
    const conctacts = new Array();
    contactsRetrieved.contacts.forEach((contact) => {
      const fullName = contact.firstname + ' ' + contact.lastname;
      const contactParsed = new Contact(contact.id, fullName,
        contact.email);
      contactParsed.mobilePhone = contact.mobilephone;
      contactParsed.nif = contact.nif__c;
      contactParsed.postalCode = contact.mailingpostalcode;
      contactParsed.street = contact.mailingstreet;
      contactParsed.city = contact.mailingcity;
      contactParsed.role = contact.role__c;
      contactParsed.sendInvoice = contact.send_invoice__c;
      contactParsed.isDeleted = contact.isdeleted;

      conctacts.push(contactParsed);
    });
    return conctacts;
  }
}
