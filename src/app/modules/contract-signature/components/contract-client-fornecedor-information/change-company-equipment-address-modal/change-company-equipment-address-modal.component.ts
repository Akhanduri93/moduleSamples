import { Component, OnInit, Inject, OnDestroy, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContractSignatureService } from '../../../../../core/http/contract-signature.service';
import { Address } from '../../../../../shared/models/contract-signature';
import { LoadingService } from '../../../../../core/services/loading.service';
import { MatSnackBar } from '@angular/material';
import { AlertBarComponent } from '../../../../../shared/components/alert-bar/alert-bar.component';

@Component({
  selector: 'app-change-company-equipment-address-modal',
  templateUrl: './change-company-equipment-address-modal.component.html',
  styleUrls: ['./change-company-equipment-address-modal.component.scss']
})
export class ChangeCompanyEquipmentAddressModalComponent implements OnInit, OnDestroy {
  /*
     :::::::----Variables Declaration----:::::: 
  */
  changeAddressForm: FormGroup;
  modalTitle: string;
  isLoading: boolean;
  address: Address;
  putAddressSubscription;
  countryOptions = [
    { country: 'Portugal', code: 'PT' },
    { country: 'Espanha', code: 'ES' }
  ];
  @Output() edit = new EventEmitter();
  /*
     :::::::----Inject services in constructor----:::::: 
  */
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<ChangeCompanyEquipmentAddressModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private contractSignatureService: ContractSignatureService,
    private loadingService: LoadingService,
    private snackBar: MatSnackBar) { }
  /*
     :::::::----Initialize the component load values----:::::: 
  */ 
  ngOnInit() {
    this.data.type === 'company' ? this.modalTitle = 'Alterar Morada da Empresa' : this.modalTitle = 'Morada de Entrega do Equipamento';
    this.changeAddressForm = this.fb.group({
      street: [(this.data.address.street ? this.data.address.street : ''), Validators.required],
      num: [(this.data.address.num ? this.data.address.num : ''), Validators.required],
      floor: [(this.data.address.floor ? this.data.address.floor.replace(' Andar', '') : '')],
      code: [(this.data.address.postalCode ? this.data.address.postalCode : ''), Validators.required],
      city: [(this.data.address.city ? this.data.address.city : ''), Validators.required],
      country: [(this.data.address.country ? (this.data.address.country === 'Portugal' ?
        this.data.address.country.replace('Portugal', 'PT') :
        this.data.address.country.replace('Espanha', 'ES')) : ''), Validators.required]
    });
  }
  /*
     :::::::----Calling update information function for updating user records.----:::::: 
  */
  updateAddress(form: FormGroup) {
    this.setLoading();
    this.updateAddressInformation(form);
    this.isLoading = false;
  }
  /*
     :::::::----Update Information function----:::::: 
  */
  updateAddressInformation(formData) {
    if (formData.valid) {
      this.address = new Address();
      this.address.street =
        formData.controls['street'].value + ', ' +
        formData.controls['num'].value + ', ' +
        formData.controls['floor'].value;
      this.address.code = formData.controls['code'].value;
      this.address.city = formData.controls['city'].value;
      this.address.country = formData.controls['country'].value;
      this.putAddressSubscription = this.contractSignatureService.putAddress(this.address, this.data)
        .subscribe((response) => {
          this.loadingService.increment(100);
          this.address.street = formData.controls['street'].value;
          this.address.num = formData.controls['num'].value;
          this.address.floor = formData.controls['floor'].value;
          this.edit.emit(this.address);
          this.isLoading = false;
          this.dialogRef.close();
        },
          (reason) => {
            if (reason.status === 400) {
              this.snackBar.openFromComponent(AlertBarComponent, {
                data: 'Erro ao alterar a morada. Por favor, tente novamente mais tarde.',
                panelClass: 'error-snackbar'
              });
            } else if (reason.status === 403) {
              this.snackBar.openFromComponent(AlertBarComponent, {
                data: 'Alteração da morada não foi permitida.',
                panelClass: 'error-snackbar'
              });
            } else {
              this.snackBar.openFromComponent(AlertBarComponent, {
                data: 'Erro ao alterar a morada. Por favor, tente novamente mais tarde.',
                panelClass: 'error-snackbar'
              });
            }
            this.loadingService.increment(100);
            this.isLoading = false;
            this.dialogRef.close();
          });
    } else {
      this.isLoading = false;
      this.dialogRef.close();
    }
  }
  /*
     :::::::----Loader function for enabling and disabling----:::::: 
  */
  setLoading() {
    this.isLoading = true;
  }
  /*
     :::::::----Unsubscribe the values-----:::::: 
  */
  ngOnDestroy() {
    if (this.putAddressSubscription) {
      this.putAddressSubscription.unsubscribe();
    }
    this.modalTitle = null;
  }
}
