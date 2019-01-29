import { Component, Input, OnDestroy, OnChanges } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import {
  ChangeCompanyEquipmentAddressModalComponent
} from '../change-company-equipment-address-modal/change-company-equipment-address-modal.component';
import { Client, Equipment } from '../../../../../shared/models/contract-signature';

@Component({
  selector: 'app-contract-client-information',
  templateUrl: './contract-client-information.component.html',
  styleUrls: ['./contract-client-information.component.scss']
})
export class ContractClientInformationComponent implements OnDestroy, OnChanges {
  
  /*
     :::::::----declare variables----:::::: 
  */
  @Input() clientInfo: Client;
  @Input() contractID: string;
  @Input() docRecipientId: string;
  @Input() token: string;
  equipmentInfo: Equipment;
  showPanel = true;
  addressDialog: MatDialogRef<ChangeCompanyEquipmentAddressModalComponent>;
  addressDialogSub;
  addressDialogCloseSub;

  constructor(private dialog: MatDialog) {
    this.equipmentInfo = this.clientInfo;
  }

  ngOnChanges() {
    this.equipmentInfo = JSON.parse(JSON.stringify(this.clientInfo));
  }
  /*
     :::::::----Open address dialog box----:::::: 
  */
  openEditAddressDialog(type) {
    this.addressDialog = this.dialog.open(ChangeCompanyEquipmentAddressModalComponent, {
      width: '25rem',
      data: {
        type: type,
        address: (type === 'company') ? this.clientInfo : this.equipmentInfo,
        contractID: this.contractID,
        docRecipientId: this.docRecipientId,
        clientId: this.clientInfo['id'],
        token: this.token
      }
    });
    if (this.addressDialog) {
      this.addressDialogSub = this.addressDialog.componentInstance.edit.subscribe((data) => {
        this.openEditAddressObserver(data, type);
      });
    }
  }
  /*
     :::::::----Checking Edit Address type----:::::: 
  */
  openEditAddressObserver(data, type) {
    if (type === 'company') {
      this.clientInfo.street = data.street;
      this.clientInfo.num = data.num;
      (data.floor ? (this.clientInfo.floor = ' ' + data.floor + ' Andar') : this.clientInfo.floor = '');
      this.clientInfo.postalCode = data.code;
      this.clientInfo.city = data.city;
      (data.country === 'PT' ? this.clientInfo.country = 'Portugal' : this.clientInfo.country = 'Espanha');
    } else {
      this.equipmentInfo.street = data.street;
      this.equipmentInfo.num = data.num;
      (data.floor ? (this.equipmentInfo.floor = ' ' + data.floor + ' Andar') : this.equipmentInfo.floor = '');
      this.equipmentInfo.postalCode = data.code;
      this.equipmentInfo.city = data.city;
      (data.country === 'PT' ? this.equipmentInfo.country = 'Portugal' : this.equipmentInfo.country = 'Espanha');
    }
    if (this.addressDialog) {
      this.addressDialogCloseSub = this.addressDialog.afterClosed().subscribe(() => {
        this.addressDialogSub.unsubscribe();
      });
    }
  }
  /*
     :::::::----Checking Equipment Address----:::::: 
  */
  changeEquipmentAddress(event) {
    this.showPanel = !this.showPanel;
    if (event.checked) {
      this.equipmentInfo.street = this.clientInfo.street;
      this.equipmentInfo.num = this.clientInfo.num;
      this.equipmentInfo.floor = this.clientInfo.floor;
      this.equipmentInfo.city = this.clientInfo.city;
      this.equipmentInfo.postalCode = this.clientInfo.postalCode;
      this.equipmentInfo.country = null;
    }
  }
  /*
     :::::::----Unsubscribing the values----:::::: 
  */
  ngOnDestroy() {
    this.clientInfo = null;
    this.equipmentInfo = null;
    if (this.addressDialogSub) {
      this.addressDialogSub.unsubscribe();
    }
    if (this.addressDialogCloseSub) {
      this.addressDialogCloseSub.unsubscribe();
    }
  }

}
