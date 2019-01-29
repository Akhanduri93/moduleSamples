import { Injectable, Optional } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Utils } from '../../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class CurrentAccountService {
  private accountLogo = new Subject<string>();
  private accountName = new Subject<string>();
  currentAccount: any;

  constructor() {
    this.clear();
  }

  setCurrentAccountName(accountName: string) {
    this.updateNameInCurrentAccount(accountName);
    this.accountName.next(accountName);
  }

  setCurrentAccountLogo(logoUrl: string) {
    this.updateLogoInCurrentAccount(logoUrl);
    this.accountLogo.next(logoUrl);
  }

  getCurrentAccountName(): Observable<any> {
    return this.accountName.asObservable();
  }

  getCurrentAccountLogo(): Observable<any> {
    return this.accountLogo.asObservable();
  }

  updateNameInCurrentAccount(accName: string) {
    this.currentAccount = {};
    this.currentAccount = JSON.parse(Utils.getInfoStorage('currentAccount'));
    this.currentAccount.name = accName;
    Utils.setInfoStorage('currentAccount', JSON.stringify(this.currentAccount));
    this.updateAccountsInStorage(this.currentAccount);
  }

  updateLogoInCurrentAccount(logoUrl: string) {
    this.currentAccount = {};
    this.currentAccount = JSON.parse(Utils.getInfoStorage('currentAccount'));
    this.currentAccount.company_logo_url__c = logoUrl;
    Utils.setInfoStorage('currentAccount', JSON.stringify(this.currentAccount));
    this.updateAccountsInStorage(this.currentAccount);
  }

  updateAccountsInStorage(currentAccount: any) {
    const allAccounts = JSON.parse(Utils.getInfoStorage('accounts'));
    let accountIndex = 0;
    allAccounts.forEach(account => {
      if (account.id === currentAccount.id) {
        allAccounts[accountIndex] = currentAccount;
      }
      accountIndex++;
    });
    Utils.setInfoStorage('accounts', JSON.stringify(allAccounts));
  }

  clear() {
    this.currentAccount = {};
    this.currentAccount = JSON.parse(Utils.getInfoStorage('currentAccount'));
    this.accountLogo.next((this.currentAccount.company_logo_url__c) ? this.currentAccount.company_logo_url__c : '');
    this.accountName.next(this.currentAccount.name);
  }
}
