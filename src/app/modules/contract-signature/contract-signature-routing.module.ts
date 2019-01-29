import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractSignatureComponent } from './pages/contract-signature/contract-signature.component';
import { ContractSignatureInvalidComponent } from './pages/contract-signature-invalid/contract-signature-invalid.component';
import {
  ContractSignatureAlreadySignedComponent
} from './pages/contract-signature-already-signed/contract-signature-already-signed.component';
import { ContractSignatureContainerComponent } from './pages/contract-signature-container/contract-signature-container.component';

export const routes: Routes = [
  {
    path: '',
    component: ContractSignatureContainerComponent,
    children: [
      {
        path: ':token/:id',
        component: ContractSignatureComponent
      },
      {
        path: 'invalid/contract/expired',
        component: ContractSignatureInvalidComponent
      },
      {
        path: 'invalid/contract/already-signed',
        component: ContractSignatureAlreadySignedComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractSignatureRoutingModule { }
