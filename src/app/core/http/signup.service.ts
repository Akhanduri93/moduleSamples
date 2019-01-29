import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, timeout } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { SignupUser } from '../../shared/models/signupuser';
import { Nif, NifContact } from '../../shared/models/nif';
import { SignupCategories } from '../../shared/models/signupcategories';

@Injectable()
export class SignupService {
  constructor(
    private http: HttpClient
  ) { }

  getFirstLastNames(name: string) {
    const compleName = new Array();
    compleName[1] = '';
    const splitedName = name.split(/ (.+)/);
    compleName[0] = splitedName[0];
    if (splitedName.length > 1) {
      compleName[1] = splitedName[1];
    }

    return compleName;
  }

  perpareIndustries(user: SignupUser) {
    const userCategories: SignupCategories[] = user.categories;
    const categories = [];
    userCategories.forEach((category, index) => {
      const subcategories = [];
      const userSubCats = category.subcategories;
      userSubCats.forEach((subcats, subcatIndex) => {
        subcategories.push(subcats.subcatName);
      });
      const categoryToSend = {
        [category.catename]: subcategories
      };

      categories.push(categoryToSend);
    });

    return categories;
  }

  prepareContacts(user: SignupUser) {
    const primaryContactName = this.getFirstLastNames(user.fullaname);
    const contacts = [];
    let secondContact;
    const primaryContact = {
      firstname: primaryContactName[0],
      lastname: primaryContactName[1],
      department: '',
      description: '',
      username__c: user.email,
      master__c: user.power,
      mobilephone: user.tele,
      send_invoice__c: true
    };

    if (user.power === true) {
      const secondContactName = this.getFirstLastNames(user.powerName);
      primaryContact.department = (user.powerDepartment) ? user.powerDepartment : '';
      primaryContact.description = user.cargo;
      primaryContact.firstname =  secondContactName[0],
      primaryContact.lastname = secondContactName[1],
      contacts.push(primaryContact);
    } else {
      const secondContactName = this.getFirstLastNames(user.powerName);
      primaryContact.master__c = false;
      primaryContact.department = '';
      contacts.push(primaryContact);
      secondContact = {
        firstname: secondContactName[0],
        lastname: secondContactName[1],
        description: user.cargo,
        department: (user.powerDepartment) ? user.powerDepartment : '',
        username__c: user.powerEmail,
        master__c: true,
        mobilephone: '',
        send_invoice__c: true
      };
      contacts.push(secondContact);
    }
    return contacts;
  }

  registerUser(user: SignupUser) {
    const postUrl = environment.apiUrl + 'sign-up/' + user.type;
    const postNewUser = {
      taxPayerNumber: user.nif,
      yearOfIncome: (user.ano) ? user.ano : '',
      industry: this.perpareIndustries(user),
      leadSfid: user.sfid,
      companyName: user.companyname,
      address: user.address,
      postalCode: user.postalCode,
      city: user.city,
      // contacts: contacts,
      contacts: this.prepareContacts(user),
      anexType: (user.anexType) ? user.anexType : '',
      anexBody: (user.anexBody) ? user.anexBody : ''
    };

    // console.log(postNewUser);
    return this.http.post<any>(postUrl, postNewUser)
      .pipe(
        timeout(60000),
        catchError((error) => {
          throw error;
        }));
  }

  validate(nifValue: string, user: SignupUser): Observable<Nif> {
    const postUrl = environment.apiUrl + 'sign-up/validate';
    const splitedName = user.fullaname.split(/ (.+)/);
    const firstname = splitedName[0];
    let lastname = '';
    if (splitedName.length > 1) {
      lastname = splitedName[1];
    }
    return this.http.post<any>(postUrl, {
      taxPayerNumber: nifValue,
      email: user.email,
      mobile: user.tele,
      firstName: firstname,
      lastName: lastname,
      countryCode: 'PT',
      isVendor: (user.type === 'vendor') ? true : false,
      isClient: (user.type === 'client') ? true : false
    })
      .pipe(map((response: any) => {
        let nif = new Nif();
        if (response.code !== '1') {
          if (response.code === '2') {
            return this.parseNif(response);
          } else {
            if (response.code === '-99') {
              return this.parseNif(response);
            } else {
              return nif;
            }
          }
        } else {
          nif = this.parseNif(response);
          return nif;
        }
      }), catchError((error) => {
        throw error;
      }));
  }


  parseNif(element: any) {
    const nif = new Nif();
    nif.companyname = element['companyName'];
    nif.nif = element['taxPayerNumber'];
    nif.city = element['city'];
    nif.address = element['address'];
    nif.postalCode = element['postalcode'];
    nif.sfid = element['sfid'];
    const nifContacts = element['contacts'];
    if (nifContacts && nifContacts.length > 0) {
      nifContacts.forEach((contact, index) => {
        const nifC = new NifContact();
        nifC.cargo = contact['description'];
        nifC.department = contact['department'];
        nifC.name = '';
        if (contact['firstName'] !== undefined) {
          nifC.firstName = contact['firstName'];
          nifC.name = nifC.name + ' ' + nifC.firstName;
        }

        if (contact['middleName'] !== undefined) {
          nifC.middleName = contact['middleName'];
          nifC.name =  nifC.name + ' ' + nifC.middleName;
        }

        if (contact['lastName'] !== undefined) {
          nifC.lastName = contact['lastName'];
          nifC.name =  nifC.name + ' ' + nifC.lastName;
        }
        // nifC.name = nifC.firstName + ' ' + nifC.middleName + ' ' + nifC.lastName;
        nifC.email = '';
        nif.contacts.push(nifC);
      });
    }
    return nif;
  }
}
