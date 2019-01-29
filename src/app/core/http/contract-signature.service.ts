import { Injectable, EventEmitter } from '@angular/core';
import { Contract } from '../../shared/models/contract';
import * as _ from 'lodash';
import { Utils } from '../../shared/utils';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { ContractSignature } from '../../shared/models/contract-signature';

@Injectable()
export class ContractSignatureService {

  changeIban = new EventEmitter();
  signedData = new EventEmitter();
  signatureFormValues = new EventEmitter();

  changeIbanDeclaration(value) {
    this.changeIban.emit(value);
  }

  setSignedData(value) {
    this.signedData.emit(value);
  }

  setSignatureFormValues(values) {
    this.signatureFormValues.emit(values);
  }

  constructor(private http: HttpClient) { }

  postContractSignData(requestData, docRecipientId) {
    const postUrl = environment.apiUrl + 'documentRecipient/sign/' + docRecipientId;
    return this.http.post<any>(postUrl, {
      signer_name__c: requestData.signerName,
      signer_phone__c: requestData.signerPhone,
      personalGuarantee: {
        street: requestData.street,
        nif__c: requestData.nif,
        phone: requestData.phone,
        postalCode: requestData.postalCode,
        city: requestData.city
      }
    })
      .pipe(catchError((error) => {
        throw error;
      }));
  }

  getContractValidation(docRecipientId) {
    return this.http.get(
      environment.apiUrl + 'documentRecipient/valid/' + docRecipientId
    ).pipe(catchError((error) => {
      throw error;
    }));
  }

  getContractSignaturePageData(docRecipientId) {
    return this.http.get(
      environment.apiUrl + 'documentRecipient/page-data/' + docRecipientId
    ).pipe(map((contractSignature) => {
      return this.parseContractSignaturePageData(contractSignature);
    }
    )).pipe(catchError((error) => {
      throw error;
    }));
  }

  postContractSignatureView(docRecipientId) {
    const postUrl = environment.apiUrl + 'documentRecipient/view/' + docRecipientId;
    return this.http.post<any>(postUrl, {})
      .pipe(catchError((error) => {
        throw error;
      }));
  }

  postDeclineContractSignature(requestData, docRecipientId) {
    const postUrl = environment.apiUrl + 'documentRecipient/decline/' + docRecipientId;
    return this.http.post<any>(postUrl, {
      declined_reason__c: requestData.reason,
      declined_comments__c: requestData.comment
    })
      .pipe(catchError((error) => {
        throw error;
      }));
  }

  putIBANData(iban, data) {
    const postUrl = environment.apiUrl + 'accounts/' + data.clientId;
    return this.http.put<any>(postUrl, {
      c2g__codabankibannumber__c: iban,
      docRecipientId: data.docRecipientId
    },
      { headers: new HttpHeaders().set('Authorization', data.token) })
      .pipe(catchError((error) => {
        throw error;
      }));
  }

  putAddress(requestData, data) {
    // const currentAccountId: Account = JSON.parse(Utils.getInfoStorage('currentAccount')).id;
    const putUrl = environment.apiUrl + 'accounts/' + data.clientId + '/contracts/' + data.contractID + '/equipments';
    return this.http.put<any>(putUrl, {
      city__c: requestData.city,
      street_address__c: requestData.street,
      zip_postal_code__c: requestData.code,
      equipment_country_code__c: requestData.pais,
      docRecipientId: data.docRecipientId
    },
      { headers: new HttpHeaders().set('Authorization', data.token) })
      .pipe(catchError((error) => {
        throw error;
      }));
  }

  parseContractSignaturePageData(contractSignatureData): ContractSignature {
    let contractSignature: ContractSignature;
    contractSignatureData.data.forEach((data) => {
      contractSignature = new ContractSignature(data.application, data.rents, data.client, data.vendor,
        data.declinedReasons, data.personalGuaranteeData, data.signer);
    });
    return contractSignature;
  }
}
