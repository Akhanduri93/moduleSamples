import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Contract } from '../../../../shared/models/contract';
import { ContractService } from '../../../../core/http/contract.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { MatSnackBar } from '@angular/material';
import { AlertBarComponent } from '../../../../shared/components/alert-bar/alert-bar.component';

@Component({
  selector: 'app-contracts-table',
  templateUrl: './contracts-table.component.html',
  styleUrls: ['./contracts-table.component.scss']
})
export class ContractsTableComponent implements OnInit, OnDestroy {

  @Input() loadingValue: number;
  contracts: Array<Contract>;
  tabLinks: { label: string, link: string }[];
  displayedColumns = ['contract', 'supplier', 'operation', 'payment', 'status', 'action'];
  showLatePayment = true;
  showNextInvoices = true;
  showContracts: Array<boolean>;

  constructor(
    private contractService: ContractService,
    private loadingService: LoadingService,
    private snackBar: MatSnackBar
  ) {
    this.tabLinks = [
      { label: 'Contractos', link: '/portal/contracts' },
      { label: 'Faturas', link: '/portal/support/invoices' }
    ];
  }

  ngOnInit() {
    this.getContracts();
  }

  // To get all the contracts
  getContracts() {
    this.contractService.getContracts()
        .subscribe((response) => {
          this.loadingService.increment(this.loadingValue);
          this.contracts = response;
          this.showContracts = new Array(this.contracts.length);
          this.showContracts.fill(false, 0, this.contracts.length);
        }, (reason) => {
          this.loadingService.increment(this.loadingValue);
          this.contracts = null;
          this.snackBar.openFromComponent(AlertBarComponent, {
            data: 'Ocorreu um erro ao carregar os seus contratos',
            panelClass: 'error-snackbar'
          });
    });
  }

  ngOnDestroy() {
    this.contracts = null;
  }

  isContractArrears(status: string) {
    if (status === 'declined') {
      return true;
    }
    return false;
  }

  isContractRunning(status: string) {
    if (status === 'running') {
      return true;
    }
    return false;
  }

  isContractCompleted(status: string) {
    if (status === 'closed') {
      return true;
    }
    return false;
  }

  isContractCanceled(status: string) {
    if (status === 'cancelled') {
      return true;
    }
    return false;
  }

  getContractStatus(status: string) {
    // FIXME
    switch (status) {
      case 'running': {
        return 'Em curso';
      }
      case 'closed': {
        return 'Fechado';
      }
      case 'declined': {
        return 'Em atraso';
      }
      case 'pending': {
        return 'Acção Judicial';
      }
      case 'cancelled': {
        return 'Cancelado';
      }
      case 'payment_plan': {
        return 'Plano de Pagamento';
      }
    }
  }

  getPaymentFrequency(pf: string) {
    // FIXME
    switch (pf) {
      case 'Monthly': {
        return 'Mensal';
      }
      case 'Quarterly': {
        return 'Trimestral';
      }
    }
  }
}
