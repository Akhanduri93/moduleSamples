import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ContractSignatureService } from '../../../../../core/http/contract-signature.service';
import { Decline } from '../../../../../shared/models/contract-signature';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LoadingService } from '../../../../../core/services/loading.service';
import { MatSnackBar } from '@angular/material';
import { AlertBarComponent } from '../../../../../shared/components/alert-bar/alert-bar.component';

@Component({
  selector: 'app-contract-signature-cancellation-modal',
  templateUrl: './contract-signature-cancellation-modal.component.html',
  styleUrls: ['./contract-signature-cancellation-modal.component.scss']
})
export class ContractSignatureCancellationModalComponent implements OnInit, OnDestroy {

  cancellationForm: FormGroup;
  isLoading: boolean;
  cancelApplication: Decline;
  cancelApplicationSubscription: Subscription;
  selectOptions = [];
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<ContractSignatureCancellationModalComponent>,
    private contractSignatureService: ContractSignatureService, @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router, private loadingService: LoadingService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.cancellationForm = this.fb.group({
      comment: [''],
      reason: ['', Validators.required]
    });
    this.selectOptions = this.data.declinedReasons;
  }

  submitCancelApplicationDescription(form: FormGroup) {
    if (form.valid) {
      this.setLoading();
      this.cancelApplication = new Decline();
      this.cancelApplication.reason = this.cancellationForm.controls['reason'].value;
      this.cancelApplication.comment = this.cancellationForm.controls['comment'].value;
      this.cancelApplicationSubscription = this.contractSignatureService.postDeclineContractSignature(
        this.cancelApplication,
        this.data.docRecipientId
      ).subscribe(response => {
        this.loadingService.increment(100);
        this.isLoading = false;
        this.dialogRef.close();
        this.router.navigate(['/']);
      },
        reason => {
          if (reason.status === 400) {
            this.snackBar.openFromComponent(AlertBarComponent, {
              data: 'Ocorreu um erro ao declinar o contrato. Por favor, tente novamente mais tarde.',
              panelClass: 'error-snackbar'
            });
          } else if (reason.status === 500) {
            this.snackBar.openFromComponent(AlertBarComponent, {
              data: 'Ocorreu um erro ao declinar o contrato. Por favor, tente novamente mais tarde.',
              panelClass: 'error-snackbar'
            });
          } else {
            this.snackBar.openFromComponent(AlertBarComponent, {
              data: 'Ocorreu um erro ao declinar o contrato. Por favor, tente novamente mais tarde.',
              panelClass: 'error-snackbar'
            });
          }
          this.loadingService.increment(100);
          this.cancelApplication = null;
          this.isLoading = false;
          this.dialogRef.close();
        });
    } else {
      this.cancelApplication = null;
      this.isLoading = false;
      this.dialogRef.close();
    }
  }

  setLoading() {
    this.isLoading = true;
  }

  ngOnDestroy() {
    this.cancelApplication = null;
    if (this.cancelApplicationSubscription) {
      this.cancelApplicationSubscription.unsubscribe();
    }
  }

}
