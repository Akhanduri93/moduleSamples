import { Contact } from '../../shared/models/contact';
import { of, Observable} from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ContactServiceMock {

    getContactByIdPayload: any = { contactInfo:
        [{id: 48,
        accountid: '0010E00000KMoDOQA1',
        firstname: 'Bernardo',
        lastname: 'Rodrigues',
        name: 'Bernardo Rodrigues',
        email: 'brodrigues@candor.pt',
        mobilephone: '92568452',
        nif__c: '254896525',
        mailingstreet: 'Av. Eusébio da Silva Ferreira',
        mailingpostalcode: '1500-542',
        mailingcity: 'Lisboa',
        login__c: 'a050E000004lrikQAA',
        role__c: 'Master',
        send_invoice__c: true,
        isdeleted: false}]};

    contactT = new Contact('1', 'Bernardo', 'ddddd@gmail.com');

    newContact(contact: any): Observable<string> {
        let insertSucces = '0';
        const currentformuserslength = this.getContactByIdPayload.contactInfo.length;
          const tempNewContact = {
            id: 48,
            accountid: '0010E00000KMoDOQA1',
            firstname: contact.name,
            lastname: contact.name,
            name: contact.name,
            email: contact.useremail,
            mobilephone: contact.mobilePhone,
            nif__c: '',
            mailingstreet: '',
            mailingpostalcode: '',
            mailingcity: contact.city,
            login__c: 'a050E000004lrikQAA',
            role__c: contact.position,
            send_invoice__c: contact.emailReciept,
            isdeleted: false
          };
          this.getContactByIdPayload.contactInfo.push(tempNewContact);
          const newUsersCount = this.getContactByIdPayload.contactInfo.length;
          if (newUsersCount > currentformuserslength) {
            insertSucces = '48';
          } else {
            insertSucces = '0';
          }
        return of(insertSucces);
      }

    getContactById(): Observable<Contact> {
        if (this.getContactByIdPayload) {
            return of(this.getContactByIdPayload);
        }
    }
    putContactData(contactToUpdate: Contact) {
        return of({'success': true});
    }

    getContacts(): Observable<Contact[]> {
        if (this.getContactByIdPayload) {
            return of(this.parseContactResults(this.getContactByIdPayload));
        }
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
        contactsRetrieved.contactInfo.forEach((contact) => {
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
