import { Injectable } from '@angular/core';
import { Contract, ContractActivity, ContractAttachment } from '../../shared/models/contract';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { Utils } from '../../shared/utils';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Equipment } from '../../shared/models/equipment';
import { Account } from '../../shared/models/account';

@Injectable()
export class ContractService {

  contracts: Array<Contract>;
  applicationId: string;
  appAttachments: Array<any>;

  constructor(private http: HttpClient) { }

  getContracts(): Observable<Contract[]> {

    const currentAccountId: Account = JSON.parse(Utils.getInfoStorage('currentAccount')).id;
    return this.http.get<any[]>(
      environment.apiUrl + 'accounts/' + currentAccountId + '/contracts',
      { headers: Utils.createAuthorizationHeader() }
    ).pipe(map((contracts) => {
      return this.parseContract(contracts);
    }
    ))
      .pipe(catchError((error) => {
        throw error;
      }));

  }

  getContractDetails(contractId) {
    const currentAccountId: Account = JSON.parse(Utils.getInfoStorage('currentAccount')).id;
    return this.http.get<JSON>(
      environment.apiUrl + 'accounts/' + currentAccountId + '/contracts/' + contractId,
      { headers: Utils.createAuthorizationHeader() }
    ).pipe(map((contract) => {
      return this.parseContractDetails(contract);
    }
    ))
      .pipe(catchError((error) => {
        throw error;
      }));
  }

  getContractSignActivities(id): Observable<ContractActivity[]> {

    const currentAccountId: Account = JSON.parse(Utils.getInfoStorage('currentAccount')).id;
    return this.http.get<any>(
      environment.apiUrl + 'accounts/' + currentAccountId + '/contracts/' + id + '/activities?processType=contract-sign',
      { headers: Utils.createAuthorizationHeader() }
    ).pipe(
      map((contracts) => {
        const contractActivities = new Array<ContractActivity>();

        contracts.data.forEach(element => {
          const contractActivity = new ContractActivity(
            element.activity,
            element.name,
            element.email,
            element.subject,
            element.description,
            element.activityDate,
            element.ipAddress);

          contractActivities.push(contractActivity);
        });

        return contractActivities;
      }),
      catchError((error) => {
        throw error;
      }));

  }

  putContractData(contractID, clientId, token, docRecipientId, frequency) {
    let currentAccountId: Account;
    let headers: HttpHeaders;
    if (token) {
      headers = new HttpHeaders().set('Authorization', token);
    } else {
      headers = Utils.createAuthorizationHeader();
    }
    if (clientId) {
      currentAccountId = clientId;
    } else {
      currentAccountId = JSON.parse(Utils.getInfoStorage('currentAccount')).id;
    }

    const putUrl = environment.apiUrl + 'accounts/' + currentAccountId + '/contracts/' + contractID + '/change-payment-freq';
    return this.http.put<any>(putUrl, {
      paymentFreq: frequency,
      docRecipientId: docRecipientId
    },
      { headers: headers });
  }

  putPaymentMethodData(contractID, method) {
    let headers: HttpHeaders;
    let currentAccountId: Account;
    if (method.token) {
      headers = new HttpHeaders().set('Authorization', method.token);
    } else {
      headers = Utils.createAuthorizationHeader();
    }
    if (method.clientId) {
      currentAccountId = method.clientId;
    } else {
      currentAccountId = JSON.parse(Utils.getInfoStorage('currentAccount')).id;
    }
    const putUrl = environment.apiUrl + 'accounts/' + currentAccountId + '/contracts/' + contractID + '/change-payment-method';
    return this.http.put<any>(putUrl, {
      payment_method__c: method.method,
      bban__c: method.iban,
      country_code__c: method.country_code,
      docRecipientId: method.docRecipientId
    },
      { headers: headers });
  }

  parseContract(contractsJSON: any[]) {
    let contracts = new Array<Contract>();
    contractsJSON.forEach(
      (contract) => {
        const contractStatus = this.parseContractStatus(contract.status__c);
        contracts.push(new Contract(contract.id, contract.name, contract.accVendor_finNumber,
          contract.accclient__c, contract.payment_method__c, contract.payment_amount__c,
          contract.payment_freq__c, contract.delivery_certificate_signed__c, contractStatus,
          contract.term__c, contract.accVendor_name));
      });
    return contracts;
  }

  parseContractDetails(contractJSON: JSON) {
    const applicationData = contractJSON['application'];
    const applicationDetails = new Contract(applicationData.id, applicationData.name, applicationData.accVendor_finNumber,
      applicationData.accclient__c, applicationData.payment_method__c, applicationData.payment_amount__c,
      applicationData.payment_freq__c, applicationData.delivery_certificate_signed__c,
      applicationData.status__c, applicationData.term__c, applicationData.accVendor_name);
    applicationDetails['applicationId'] = applicationData.sfid;
    const equimentData = contractJSON['equipment'];
    const equipmentDetails: Equipment[] = this.parseEquipments(equimentData);

    const accountDetails: any = {
      name: applicationData.accVendor_name, financialNumber: applicationData.accVendor_finNumber
    };

    const contractAttachments = new Array<ContractAttachment>();

    contractJSON['attachments'].forEach(element => {
      const attachment = new ContractAttachment(
        element.application_id,
        element.created_at,
        element.id,
        element.link,
        element.name,
        element.type);

      contractAttachments.push(attachment);
    });

    const contractDetails = {
      account: accountDetails,
      application: applicationDetails,
      equipments: equipmentDetails,
      rents: contractJSON['rents'],
      attachments: contractAttachments,
      signers: contractJSON['signers'],
      insurance: contractJSON['insurance']
    };
    return contractDetails;
  }

  parseEquipments(equipments) {
    const equipmentArray: Equipment[] = [];
    const soloEquipments = equipments.filter(equipment => equipment.equipment_quantity__c === 1);
    const variousEquipments = equipments.filter(equipment => equipment.equipment_quantity__c > 1);

    variousEquipments.forEach(equipment => {
      let serialNumbersArray: string[] = [];
      serialNumbersArray.push(equipment.equipment_serial_number__c);
      equipmentArray.push(new Equipment(equipment.equipment_description__c,
        equipment.equipment_quantity__c, serialNumbersArray)
      );
    });

    let descriptionIterated = [];
    soloEquipments.forEach(element => {
      if (!descriptionIterated.includes(element.equipment_description__c)) {
        // tslint:disable-next-line:prefer-const
        let serialNumbers: string[] = [];
        // tslint:disable-next-line:prefer-const
        let filteredEquipment = soloEquipments.filter(equip => equip.equipment_description__c === element.equipment_description__c);
        filteredEquipment.forEach(equipForSerialNumbers => serialNumbers.push(equipForSerialNumbers.equipment_serial_number__c));
        equipmentArray.push(new Equipment(element.equipment_description__c, filteredEquipment.length, serialNumbers));

        descriptionIterated.push(element.equipment_description__c);
      }
    });

    return equipmentArray;
  }


  getAttachments(applicationId: string): Promise<any> {

    if (this.applicationId === applicationId && this.appAttachments) {
      return new Promise((resolve, reject) => {
        resolve(this.appAttachments);
      });

    } else {

      const sessionToken = JSON.parse(localStorage.currentUser).sessionToken;
    }
  }

  reset() {
    this.contracts = null;
  }

  private parseAmount(amount) {
    return _.round(parseFloat(amount), 2).toFixed(2).toString();
  }

  private parsePeriod(period) {
    // FIXME
    switch (period) {
      case 'Monthly': { return 'Mensal'; }
      case 'Quarterly': { return 'Trimestral'; }
      default: { return ''; }
    }
  }

  private parsePaymentType(type) {
    // FIXME
    switch (type) {
      case 'Direct Debit': { return 'Débito Direto'; }
      case 'Multibanco': { return 'Multibanco'; }
      case 'ATM Reference': { return 'Multibanco'; }
      default: { return ''; }
    }
  }

  private parseContractStatus(status) {
    // FIXME
    switch (status) {
      case 'Application - Approved': { return 'approved'; }
      case 'Contract - Running': { return 'running'; }
      case 'Contract - Arrears': { return 'declined'; }
      case 'Contract - Canceled': { return 'cancelled'; }
      case 'Contract - Lawsuit': { return 'pending'; }
      case 'Contract - Closed': { return 'closed'; }
      case 'Contract - Payment Plan': { return 'payment_plan'; }
      case 'Application - Rejected': { return 'declined'; }
      case 'Application - Pendent': { return 'pending'; }
      default: return '';
    }
  }

  private parseStatusText(status) {
    // FIXME
    switch (status) {
      case 'Application - Approved': { return 'Aprovado'; }
      case 'Contract - Running': { return 'Em curso'; }
      case 'Contract - Arrears': { return 'Em atraso'; }
      case 'Contract - Canceled': { return 'Cancelado'; }
      case 'Contract - Lawsuit': { return 'Contencioso'; }
      case 'Contract - Ended': { return 'Concluído'; }
      case 'Application - Rejected': { return 'Rejeitado'; }
      case 'Application - Pendent': { return 'Pendente'; }
      default: return status;
    }
  }
}
