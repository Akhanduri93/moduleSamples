import { Component, OnInit, Inject, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContractSignatureService } from '../../../../../core/http/contract-signature.service';
import { LoadingService } from '../../../../../core/services/loading.service';
import { MatSnackBar } from '@angular/material';
import { AlertBarComponent } from '../../../../../shared/components/alert-bar/alert-bar.component';

@Component({
  selector: 'app-change-iban-modal',
  templateUrl: './change-iban-modal.component.html',
  styleUrls: ['./change-iban-modal.component.scss']
})
export class ChangeIBANModalComponent implements OnInit, OnDestroy {
  /*
     :::::::----declare variables----:::::: 
  */
  ibanForm: FormGroup;
  methods = [{ name: 'Débito Direto', value: 'Direct Debit' }, { name: 'Multibanco', value: 'ATM' }];
  showNovoIban = true;
  isLoading: boolean;
  select: boolean;
  iban: string;
  contractSignatureIbanSubscription;
  hideOptions = false;
  options = [];
  @Output() edit = new EventEmitter();
  /*
     :::::::----Injecting services in constructor----:::::: 
  */
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<ChangeIBANModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private contractSignatureService: ContractSignatureService,
    private loadingService: LoadingService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    (this.data.ibanInfo ? this.options.push(this.data.ibanInfo) : this.options.push('N/A'));
    this.ibanForm = this.fb.group({
      method: [(this.data.applicationPaymentMethod ? this.data.applicationPaymentMethod : '')],
      escolherChecked: [],
      selectedOption: '',
      novoChecked: [true],
      iban: [(this.data.ibanInfo ? this.data.ibanInfo : ''), Validators.required]
    });
    this.ibanForm.controls['method'].disable();
  }
  /*
     :::::::----Calling update IBAN Number function----:::::: 
  */
  updateIban(form: FormGroup) {
    this.setLoading();
    this.updateIbanObserver(form);
    this.isLoading = false;
  }
  /*
     :::::::----Update IBAN Number function----:::::: 
  */
  updateIbanObserver(formData) {
    if (formData.valid) {
      if (formData.value.selectedOption) {
        this.iban = formData.value.selectedOption;
      } else {
        this.iban = formData.value.iban;
      }
      this.contractSignatureIbanSubscription = this.contractSignatureService.putIBANData(this.iban, this.data).subscribe((response) => {
        this.loadingService.increment(100);
        this.edit.emit(this.iban);
        this.isLoading = false;
        this.dialogRef.close();
      },
        (reason) => {
          if (reason.status === 400) {
            this.snackBar.openFromComponent(AlertBarComponent, {
              data: 'Erro ao alterar o IBAN. Por favor, tente novamente mais tarde.',
              panelClass: 'error-snackbar'
            });
          } else if (reason.status === 403) {
            this.snackBar.openFromComponent(AlertBarComponent, {
              data: 'Erro ao alterar o IBAN. Por favor, tente novamente mais tarde.',
              panelClass: 'error-snackbar'
            });
          } else {
            this.snackBar.openFromComponent(AlertBarComponent, {
              data: 'Erro ao alterar o IBAN. Por favor, tente novamente mais tarde.',
              panelClass: 'error-snackbar'
            });
          }
          this.loadingService.increment(100);
          this.iban = null;
          this.isLoading = false;
          this.dialogRef.close();
        });
    } else {
      this.isLoading = false;
      this.dialogRef.close();
    }
  }
  /*
     :::::::----Show and hide values of IBAN----:::::: 
  */
  onEscolherChange(form) {
    this.hideOptions = false;
    this.showNovoIban = false;
    form.value.iban = '';
  }
  /*
     :::::::----Values of IBAN on change function----:::::: 
  */
  onNovoIBANChange(form) {
    this.select = false;
    form.value.selectedOption = '';
  }
  /*
     :::::::----set Loader values----:::::: 
  */
  setLoading() {
    this.isLoading = true;
  }
  /*
     :::::::----close modal function----:::::: 
  */
  closeModal() {
    this.dialogRef.close();
  }
  /*
     :::::::----unsubscribe the values on destory function----:::::: 
  */
  ngOnDestroy() {
    if (this.contractSignatureIbanSubscription) {
      this.contractSignatureIbanSubscription = null;
    }
    this.iban = null;
  }

}
