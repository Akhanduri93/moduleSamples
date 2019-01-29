import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Account } from '../../../../shared/models/account';
import { AccountService } from '../../../../core/http/account.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { Utils } from '../../../../shared/utils';

@Component({
  selector: 'app-financial-status',
  templateUrl: './financial-status.component.html',
  styleUrls: ['./financial-status.component.scss']
})
export class FinancialStatusComponent implements OnInit, OnDestroy {

  @Input() loadingValue: number;
  account: Account;
  usedPercent = 0;

  constructor(
    private accountService: AccountService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit() {
    this.getCurrentAccount();
  }

  getCurrentAccount() {
    this.accountService.getCurrentAccount()
      .subscribe((data) => {
        let accountInfo = {};
        this.loadingService.increment(this.loadingValue);
        this.account = data;
        accountInfo = JSON.parse(Utils.getInfoStorage('currentAccount'));
        accountInfo['iban'] = this.account.iban;
        Utils.setInfoStorage('currentAccount', JSON.stringify(accountInfo));
        this.setUsedPercent(this.account.usedCredit, this.account.usedCredit + this.account.availableCredit);
      },
        (error) => {
          this.loadingService.increment(this.loadingValue);
          this.account = null;
        });
  }

  setUsedPercent(used, total) {
    const usedPercentFormat = used / total;
   if (isNaN(usedPercentFormat)) {
     this.usedPercent = 0;
   } else {
   this.usedPercent = usedPercentFormat;
   }
 }

  ngOnDestroy() {
    this.account = null;
  }
}
