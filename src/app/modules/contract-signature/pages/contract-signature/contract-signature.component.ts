import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractSignature } from '../../../../shared/models/contract-signature';
import { LoadingService } from '../../../../core/services/loading.service';
import { Observable, Subscription } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ContractSignatureService } from '../../../../core/http/contract-signature.service';
import { MatSnackBar } from '@angular/material';
import { AlertBarComponent } from '../../../../shared/components/alert-bar/alert-bar.component';
import {
  ContractSignatureCancellationModalComponent
} from '../../components/contract-signature-form/contract-signature-cancellation-modal/contract-signature-cancellation-modal.component';
import { Sign } from '../../../../shared/models/contract-signature';
import { MatDialog } from '@angular/material';
import {
  ContractInsuranceModalComponent
} from '../../components/contract-insurance-modal/contract-insurance-modal.component';
@Component({
  selector: 'app-contract-signature',
  templateUrl: './contract-signature.component.html',
  styleUrls: ['./contract-signature.component.scss']
})
export class ContractSignatureComponent implements OnInit, OnDestroy {
  /*
     :::::::----Declare variables----:::::: 
  */ 
  contractSignature: ContractSignature;
  isLoading = false;
  docRecipientId: string;
  token: string;
  contractValidationSubscription: Subscription;
  contractPageDataSubscription: Subscription;
  contractViewSubscription: Subscription;
  routeSubscription: Subscription;
  signedInfo = {
    name: null
  };
  ibanDeclaration = false;
  contractSignatureSignedDataSubscription: Subscription;
  contractSignatureIbanDeclarationSubscription: Subscription;
  contractSignatureFormSubscription: Subscription;
  declaration: boolean;
  contact: Sign;
  isFormInvalid = false;
  disableAcceptButton = true;
  accepted = false;

  @ViewChild('stepper') stepper;

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]);
  isMobile: Observable<BreakpointState> = this.breakpointObserver.observe([Breakpoints.XSmall]);

  constructor(private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private breakpointObserver: BreakpointObserver,
    private signatureService: ContractSignatureService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {
  }
  /*
     :::::::----On component load the initial signature values and clause values----:::::: 
  */ 
  ngOnInit() {
    this.routeSubscription = this.activatedRoute.params.subscribe(params => {
      this.docRecipientId = params['id'];
      this.token = params['token'];
    });
    if (this.signatureService.signedData) {
      this.contractSignatureSignedDataSubscription = this.signatureService.signedData.subscribe(data => {
        this.signedInfo = data;
      });
    }
    if (this.signatureService.changeIban) {
      this.contractSignatureIbanDeclarationSubscription = this.signatureService.changeIban.subscribe(data => {
        this.ibanDeclaration = data;
      });
    }
    if (this.signatureService.signatureFormValues) {
      this.contractSignatureFormSubscription = this.signatureService.signatureFormValues.subscribe(formData => {
        if (formData.valid) {
          this.contact = new Sign();
          this.contact.signerPhone = formData.controls['telephoneNumber'].value;
          this.contact.signerName = formData.controls['name'].value;
          this.contact.street = formData.controls['street'].value;
          this.contact.phone = formData.controls['telephoneNumber'].value;
          this.contact.nif = formData.controls['nif'].value;
          this.contact.city = formData.controls['city'].value;
          this.contact.postalCode = formData.controls['postalCode'].value;
          this.validateContact(this.contact);
        } else {
          this.isFormInvalid = true;
        }
      });
    }

    this.setLoading();
    this.contractValidationSubscription = this.signatureService.getContractValidation(this.docRecipientId).subscribe(data => {
      this.contractPageDataSubscription = this.signatureService.getContractSignaturePageData(this.docRecipientId).subscribe(response => {
        this.contractSignature = response;
        this.contact = new Sign();
        this.contact.signerPhone = ((this.contractSignature.personalGuarantee && this.contractSignature.personalGuarantee.mobile) ?
          this.contractSignature.personalGuarantee.mobile : this.contractSignature.signer.phone);
        this.contact.signerName = ((this.contractSignature.personalGuarantee && this.contractSignature.personalGuarantee.name) ?
          this.contractSignature.personalGuarantee.name : this.contractSignature.signer.name);
        this.contact.street = (this.contractSignature.personalGuarantee ? this.contractSignature.personalGuarantee.street : '');
        this.contact.phone = ((this.contractSignature.personalGuarantee && this.contractSignature.personalGuarantee.mobile) ?
          this.contractSignature.personalGuarantee.mobile : this.contractSignature.signer.phone);
        this.contact.nif = (this.contractSignature.personalGuarantee ? this.contractSignature.personalGuarantee.nif : '');
        this.contact.city = (this.contractSignature.personalGuarantee ? this.contractSignature.personalGuarantee.city : '');
        this.contact.postalCode = (this.contractSignature.personalGuarantee ? this.contractSignature.personalGuarantee.postalCode : '');
        if (this.contractSignature.personalGuarantee) {
          this.validateContact(this.contact);
        }
        this.loadingService.increment(100);
        this.isLoading = false;
      },
        (reason) => {
          if (reason.status === 400) {
            this.snackBar.openFromComponent(AlertBarComponent, {
              data: 'Ocorreu um erro ao obter a informação do contrato. Por favor, tente novamente mais tarde.',
              panelClass: 'error-snackbar'
            });
          } else if (reason.status === 403) {
            this.snackBar.openFromComponent(AlertBarComponent, {
              data: 'Ocorreu um erro ao obter a informação do contrato. Por favor, tente novamente mais tarde.',
              panelClass: 'error-snackbar'
            });
          } else {
            this.snackBar.openFromComponent(AlertBarComponent, {
              data: 'Ocorreu um erro ao obter a informação do contrato. Por favor, tente novamente mais tarde.',
              panelClass: 'error-snackbar'
            });
          }
          this.loadingService.increment(100);
          this.isLoading = false;
        });
    },
      (reason) => {
        if (reason.status === 400) {
          this.snackBar.openFromComponent(AlertBarComponent, {
            data: 'Ocorreu um erro ao validar o contrato. Por favor, tente novamente mais tarde.',
            panelClass: 'error-snackbar'
          });
        } else if (reason.status === 403) {
          if (reason.error.results.errors[0].message === 'Forbidden - This recipient has already signed!') {
            this.router.navigate(['/contract-signature/invalid/contract/already-signed']);
          } else {
            this.router.navigate(['/contract-signature/invalid/contract/expired']);
          }
        } else {
          this.snackBar.openFromComponent(AlertBarComponent, {
            data: reason.message + ':' + reason.error.results.errors[0].message,
            panelClass: 'error-snackbar'
          });
        }
        this.loadingService.increment(100);
        this.isLoading = false;
      });
    this.contractViewSubscription = this.signatureService.postContractSignatureView(this.docRecipientId).subscribe(response => { },
      (reason) => {
        if (reason.status === 400) {
          this.snackBar.openFromComponent(AlertBarComponent, {
            data: 'Ocorreu um erro ao visualizar o contrato. Por favor, tente novamente mais tarde.',
            panelClass: 'error-snackbar'
          });
        } else {
          this.snackBar.openFromComponent(AlertBarComponent, {
            data: 'Ocorreu um erro ao visualizar o contrato. Por favor, tente novamente mais tarde.',
            panelClass: 'error-snackbar'
          });
        }
        this.loadingService.increment(100);
        this.isLoading = false;
      });
  }

  setLoading() {
    this.isLoading = true;
  }
  /*
     :::::::----cancellation Dialog----:::::: 
  */ 
  openCancellationDialog() {
    this.dialog.open(ContractSignatureCancellationModalComponent, {
      width: '25rem',
      data: {
        docRecipientId: this.docRecipientId,
        declinedReasons: this.contractSignature.declinedReasons
      }
    });
  }
  /*
     :::::::----calling Add Clause function----:::::: 
  */
  addClause() {
    this.setLoading();
    this.addClauseInformation();
  }
  /*
     :::::::----Add Clause function----:::::: 
  */
  addClauseInformation() {
    this.contractSignatureFormSubscription = this.signatureService.postContractSignData(this.contact,
      this.docRecipientId).subscribe((response) => {
        this.loadingService.increment(100);
        this.isLoading = false;
        this.accepted = true;
        this.signatureService.setSignedData({
          name: (this.contact ? this.contact['signerName'] : null),
          id: this.docRecipientId,
          date: new Date()
        });
      },
        (reason) => {
          if (reason.status === 400) {
            this.snackBar.openFromComponent(AlertBarComponent, {
              data: 'Ocorreu um erro ao assinar o contrato. Por favor, tente novamente mais tarde.',
              panelClass: 'error-snackbar'
            });
          } else if (reason.status === 403) {
            this.snackBar.openFromComponent(AlertBarComponent, {
              data: 'O nome que introduziu não corresponde ao nome registado.',
              panelClass: 'error-snackbar'
            });
          } else {
            this.snackBar.openFromComponent(AlertBarComponent, {
              data: 'Ocorreu um erro ao assinar o contrato. Por favor, tente novamente mais tarde.',
              panelClass: 'error-snackbar'
            });
          }
          this.loadingService.increment(100);
          this.isLoading = false;
        });
  }
  /*
     :::::::----validate the contact data----:::::: 
  */
  validateContact(contact) {
    this.isFormInvalid = Object.keys(contact).some(function (value) {
      return contact[value] === '' || contact[value] === undefined;
    });
  }
  /*
     :::::::----change of clause function----:::::: 
  */
  onSelectionChange(event) {
    if (event.selectedIndex === 5) {
      this.disableAcceptButton = false;
    }
  }
  /*
     :::::::----Open insurance dialog function----:::::: 
  */
  openInsuranceDialog() {
    this.dialog.open(ContractInsuranceModalComponent, {
      width: 'auto'
    });
  }
  /*
     :::::::----unsubscribe the values with destroy method----:::::: 
  */
  ngOnDestroy() {
    this.contractSignature = null;
    this.contact = null;
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.contractValidationSubscription) {
      this.contractValidationSubscription.unsubscribe();
    }
    if (this.contractPageDataSubscription) {
      this.contractPageDataSubscription.unsubscribe();
    }
    if (this.contractViewSubscription) {
      this.contractViewSubscription.unsubscribe();
    }
    if (this.contractSignatureIbanDeclarationSubscription) {
      this.contractSignatureIbanDeclarationSubscription.unsubscribe();
    }
    if (this.contractSignatureSignedDataSubscription) {
      this.contractSignatureSignedDataSubscription.unsubscribe();
    }
    if (this.contractSignatureFormSubscription) {
      this.contractSignatureFormSubscription.unsubscribe();
    }
  }
}
