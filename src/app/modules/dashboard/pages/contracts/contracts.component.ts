import {Component, OnInit} from '@angular/core';
import {LoadingService} from '../../../../core/services/loading.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {

  loadingValue = 0;
  showNextInvoices = true;
  hasPayments = true;

  constructor(
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadingService.getValue().subscribe(value => { this.loadingValue = value; });
  }

  showPaymentInfo() {
    return this.showNextInvoices;
  }

  displayNextInvoices(exists: boolean) {
    this.showNextInvoices = exists;
  }

  setPayments(hasPayments: boolean) {
    this.hasPayments = hasPayments;
  }
}
