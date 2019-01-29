import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sign, PersonalGuarantee, Signer } from '../../../../shared/models/contract-signature';
import { CustomValidators } from '../../../../shared/directives/custom-validators';
import { ContractSignatureService } from '../../../../core/http/contract-signature.service';

@Component({
  selector: 'app-contract-signature-form',
  templateUrl: './contract-signature-form.component.html',
  styleUrls: ['./contract-signature-form.component.scss']
})
export class ContractSignatureFormComponent implements OnInit, OnDestroy {

  @ViewChild('form') form;
  @Input() docRecipientId: string;
  @Input() declinedReasons: Array<string>;
  @Input() personalGuarantee: PersonalGuarantee;
  @Input() signer: Signer;
  @Input() accepted;
  isLoading: boolean;
  contact: Sign;
  signatureForm: FormGroup;
  contractSignatureFormSubscription;
  contractSignatureChangeIbanSubscription;
  ibanDeclaration = false;

  constructor(
    private fb: FormBuilder,
    private contractSignatureService: ContractSignatureService) {
  }

  ngOnInit() {
    if (this.contractSignatureService.changeIban) {
      this.contractSignatureChangeIbanSubscription = this.contractSignatureService.changeIban.subscribe(data => {
        this.ibanDeclaration = data;
      });
    }

    this.setForm();
    if (this.signatureForm.valueChanges) {
      this.contractSignatureFormSubscription = this.signatureForm.valueChanges.subscribe(() => {
        this.contractSignatureService.setSignatureFormValues(this.signatureForm);
      });
    }
  }

  setForm() {
    this.signatureForm = this.fb.group({
      name: [{
        value: ((this.personalGuarantee && this.personalGuarantee.name) ? this.personalGuarantee.name : this.signer.name),
        disabled: true
      }],
      telephoneNumber: [{
        value: ((this.personalGuarantee && this.personalGuarantee.mobile) ? this.personalGuarantee.mobile : this.signer.phone),
        disabled: (this.personalGuarantee && this.personalGuarantee.mobile) || this.signer.phone
      }, [
        Validators.required,
        CustomValidators.phoneNoValidate('telephoneNumber')
      ]],
      nif: [{
        value: ((this.personalGuarantee && this.personalGuarantee.nif) ? this.personalGuarantee.nif : ''),
        disabled: (this.personalGuarantee && this.personalGuarantee.nif)
      }, [
        Validators.required,
        Validators.pattern(/[0-9]{9}/g)
      ]],
      street: [{
        value: ((this.personalGuarantee && this.personalGuarantee.street) ? this.personalGuarantee.street : ''),
        disabled: (this.personalGuarantee && this.personalGuarantee.street)
      }, Validators.required],
      postalCode: [{
        value: ((this.personalGuarantee && this.personalGuarantee.postalCode) ? this.personalGuarantee.postalCode : ''),
        disabled: (this.personalGuarantee && this.personalGuarantee.postalCode)
      }, [
        Validators.required,
        Validators.pattern(/[0-9]{4}-[0-9]{3}/g)
      ]],
      city: [{
        value: ((this.personalGuarantee && this.personalGuarantee.city) ? this.personalGuarantee.city : ''),
        disabled: (this.personalGuarantee && this.personalGuarantee.city)
      }, Validators.required]
    });
  }

  getNifErrorMessage() {
    return this.signatureForm.controls['nif'].hasError('required') ? 'NIF é obrigatório.' :
      this.signatureForm.controls['nif'].hasError('pattern') ? 'NIF inválido.' :
        '';
  }
  getPhoneErrorMessage() {
    return this.signatureForm.controls['telephoneNumber'].hasError('required') ? 'Contacto Telefónico é obrigatório' :
      this.signatureForm.controls['telephoneNumber'].hasError('invalid') ? 'Contacto Telefónico inválido.' :
        '';
  }
  getPostalCodeErrorMessage() {
    return this.signatureForm.controls['postalCode'].hasError('required') ? 'Código Postal é obrigatório.' :
      this.signatureForm.controls['postalCode'].hasError('pattern') ? 'Código Postal inválido.' :
        '';
  }

  ngOnDestroy() {
    this.contact = null;
    if (this.contractSignatureFormSubscription) {
      this.contractSignatureFormSubscription.unsubscribe();
    }
    if (this.contractSignatureChangeIbanSubscription) {
      this.contractSignatureChangeIbanSubscription.unsubscribe();
    }
  }

}
