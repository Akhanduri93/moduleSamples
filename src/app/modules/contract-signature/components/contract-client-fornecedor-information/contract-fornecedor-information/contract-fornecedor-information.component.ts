import { Component, Input, OnDestroy } from '@angular/core';
import { Vendor } from '../../../../../shared/models/contract-signature';

@Component({
  selector: 'app-contract-fornecedor-information',
  templateUrl: './contract-fornecedor-information.component.html',
  styleUrls: ['./contract-fornecedor-information.component.scss']
})
export class ContractFornecedorInformationComponent implements OnDestroy {
  @Input() providerInfo: Vendor;

  ngOnDestroy() {
    this.providerInfo = null;
  }

}
