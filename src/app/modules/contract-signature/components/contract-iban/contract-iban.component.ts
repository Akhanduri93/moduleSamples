import { Component, Input, OnDestroy } from '@angular/core';
import { ChangeIBANModalComponent } from './change-iban-modal/change-iban-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ContractSignatureService } from '../../../../core/http/contract-signature.service';

@Component({
  selector: 'app-contract-iban',
  templateUrl: './contract-iban.component.html',
  styleUrls: ['./contract-iban.component.scss']
})
export class ContractIbanComponent implements OnDestroy {

  @Input() ibanInfo;
  @Input() applicationPaymentMethod;
  @Input() docRecipientId;
  @Input() token;
  @Input() clientId;
  ibanDialog: MatDialogRef<ChangeIBANModalComponent>;
  ibanDialogSub;
  ibanDialogCloseSub;

  constructor(private dialog: MatDialog, private contractSignatureService: ContractSignatureService) { }

  openEditIbanDialog(): void {
    this.ibanDialog = this.dialog.open(ChangeIBANModalComponent, {
      width: '25rem',
      data: {
        ibanInfo: this.ibanInfo,
        applicationPaymentMethod: this.applicationPaymentMethod,
        docRecipientId: this.docRecipientId,
        clientId: this.clientId,
        token: this.token
      }
    });
    if (this.ibanDialog) {
      this.ibanDialogSub = this.ibanDialog.componentInstance.edit.subscribe((data) => {
        this.openIbanDialogObserver(data);
      });
    }
  }

  openIbanDialogObserver(data) {
    this.ibanInfo = data;
    if (this.ibanDialog) {
      this.ibanDialogCloseSub = this.ibanDialog.afterClosed().subscribe(() => {
        this.ibanDialogSub.unsubscribe();
      });
    }
  }

  changeIbanDeclaration(value) {
    this.contractSignatureService.changeIbanDeclaration(value.checked);
  }

  ngOnDestroy() {
    this.ibanInfo = null;
    this.docRecipientId = null;
    if (this.ibanDialogSub) {
      this.ibanDialogSub.unsubscribe();
    }
    if (this.ibanDialogCloseSub) {
      this.ibanDialogCloseSub.unsubscribe();
    }
  }

}
