import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Module Specific imports
import { MyPipesModule } from '../../shared/pipes/myPipes.module';
import { AppMaterialModule } from '../../shared/app-material.module';
import { SharedModule } from '../../shared/shared.module';
import { ContractSignatureComponent } from './pages/contract-signature/contract-signature.component';
import { ContractClausesComponent } from './components/contract-clauses/contract-clauses.component';
import {
  ContractClientInformationComponent
} from './components/contract-client-fornecedor-information/contract-client-information/contract-client-information.component';
import { ContractSignatureFormComponent } from './components/contract-signature-form/contract-signature-form.component';
import { ChangeIBANModalComponent } from './components/contract-iban/change-iban-modal/change-iban-modal.component';
import {
  ChangeCompanyEquipmentAddressModalComponent
  // tslint:disable-next-line:max-line-length
} from './components/contract-client-fornecedor-information/change-company-equipment-address-modal/change-company-equipment-address-modal.component';
import { ContractConfirmationModalComponent } from './components/contract-confirmation-modal/contract-confirmation-modal.component';
import {
  ContractSignatureCancellationModalComponent
} from './components/contract-signature-form/contract-signature-cancellation-modal/contract-signature-cancellation-modal.component';
import { ContractIbanComponent } from './components/contract-iban/contract-iban.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { ContractSignedInformationComponent } from './components/contract-signed-information/contract-signed-information.component';
import { ContractSignatureInvalidComponent } from './pages/contract-signature-invalid/contract-signature-invalid.component';
import {
  ContractSignatureAlreadySignedComponent
} from './pages/contract-signature-already-signed/contract-signature-already-signed.component';
import { ContractSignatureRoutingModule } from './contract-signature-routing.module';
import { ContractDetailsModule } from '../contract-details/contract-details.module';
import { ContractSignatureContainerComponent } from './pages/contract-signature-container/contract-signature-container.component';
import {
  ContractFornecedorInformationComponent
} from './components/contract-client-fornecedor-information/contract-fornecedor-information/contract-fornecedor-information.component';
import { ContractInsuranceModalComponent } from './components/contract-insurance-modal/contract-insurance-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MyPipesModule,
    AppMaterialModule,
    SharedModule,
    MyPipesModule,
    ReactiveFormsModule,
    DashboardModule,
    ContractSignatureRoutingModule,
    ContractDetailsModule
  ],
  declarations: [
    ContractSignatureComponent,
    ContractClausesComponent,
    ContractClientInformationComponent,
    ContractSignatureFormComponent,
    ChangeIBANModalComponent,
    ChangeCompanyEquipmentAddressModalComponent,
    ContractConfirmationModalComponent,
    ContractSignatureCancellationModalComponent,
    ContractIbanComponent,
    ContractSignedInformationComponent,
    ContractSignatureInvalidComponent,
    ContractSignatureAlreadySignedComponent,
    ContractSignatureContainerComponent,
    ContractFornecedorInformationComponent,
    ContractInsuranceModalComponent
  ],
  entryComponents: [
    ChangeIBANModalComponent,
    ChangeCompanyEquipmentAddressModalComponent,
    ContractConfirmationModalComponent,
    ContractSignatureCancellationModalComponent,
    ContractInsuranceModalComponent
  ]
})
export class ContractSignatureModule { }
