import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { LatePayment } from '../../../../shared/models/latePayment';
import { Invoice } from '../../../../shared/models/invoice';
import { LoadingService } from '../../../../core/services/loading.service';
import { FinancialService } from '../../../../core/http/financial.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-payment-information',
  templateUrl: './payment-information.component.html',
  styleUrls: ['./payment-information.component.scss'],
})
export class PaymentInformationComponent implements OnInit, OnDestroy {

  @Input() loadingValue: number;
  // These event exist so that the FinancialStatusCard can stretch in case paymentInfo does not exist.
  @Output() existNextInvoices = new EventEmitter<boolean>();

  upcomingInvoices: Array<Invoice>;
  subCards: Map<string, boolean>;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]);
  constructor(
    private financialService: FinancialService,
    private loadingService: LoadingService,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
    this.setSubCards();
    this.getNextInvoices();
  }

  setSubCards() {
    this.subCards = new Map<string, boolean>();
    this.subCards.set('nextInvoices', false);
  }

  existsNextInvoices() {
    if (this.upcomingInvoices) {
      if (this.upcomingInvoices.length > 0) {
        return true;
      }
    }
    return false;
  }

  isNextInvoicesPage() {
    return this.subCards.get('nextInvoices');
  }

  getNextInvoices() {
    this.financialService.getNextInvoices().subscribe(
      (result) => {
        if (result.length > 0) {
          this.upcomingInvoices = result;
          this.existNextInvoices.emit(true);
        } else {
          this.upcomingInvoices = [];
          this.existNextInvoices.emit(false);
        }
          this.subCards.set('nextInvoices', true);
      },
      (reason) => {
        this.upcomingInvoices = [];
        this.existNextInvoices.emit(false);
        this.subCards.set('nextInvoices', false);
      });
  }

  ngOnDestroy() {
    this.upcomingInvoices = null;
  }
}
