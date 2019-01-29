import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {LatePayment} from '../../models/latePayment';
import {LoadingService} from '../../../core/services/loading.service';
import {MatSnackBar} from '@angular/material';
import {AlertBarComponent} from '../alert-bar/alert-bar.component';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import {FinancialService} from '../../../core/http/financial.service';

@Component({
  selector: 'app-late-payments',
  templateUrl: './late-payments.component.html',
  styleUrls: ['./late-payments.component.scss']
})
export class LatePaymentsComponent implements OnInit, OnDestroy {

  @Input() loadingValue: number;
  hasLatePayment = false;
  isLoading = false;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe([Breakpoints.XSmall]);
  fServSub: Subscription;
  // Default limit for showing LatePayments
  invoicesDefaultLimit = 2;
  mbReferenceMap: Map<number, boolean>;
  // The current number of LatePayments showed
  invoicesCurrentLimit = 2;
  invoices: LatePayment[];
  // We use this emitter to tell parent component if we have late payments or not
  @Output() hasPayments = new EventEmitter<boolean>();

  constructor(
    private paymentInformation: FinancialService,
    private breakpointObserver: BreakpointObserver,
    private loadingService: LoadingService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getLatePayment();
  }

  getLatePayment() {
    this.setLoading();
    this.fServSub = this.paymentInformation.getLatePayment()
      .subscribe(
        (late_payment) => {
          this.invoices = late_payment;
          this.mbReferenceMap = new Map<number, boolean>();
          for (let index = 0; index < late_payment.length; index++) {
            this.mbReferenceMap.set(index, false);
          }
          this.hasLatePayment = late_payment.length > 0;
          this.isLoading = false;
          this.hasPayments.emit(late_payment.length > 0);
          this.loadingService.increment(this.loadingValue);
        },
        reason => {
          this.isLoading = false;
          this.hasLatePayment = false;
          this.invoices = [];
          this.mbReferenceMap = new Map<number, boolean>();
          this.snackBar.openFromComponent(AlertBarComponent,
            { data: 'Erro ao carregar facturas em atraso.', panelClass: 'error-snackbar' });
          this.loadingService.increment(this.loadingValue);
          this.hasPayments.emit(false);
        });
  }

  setLoading() {
    this.isLoading = true;
  }

  ngOnDestroy() {
    if (this.fServSub) {
      this.fServSub.unsubscribe();
    }
  }

  onToggleMBReference(index: number) {
      this.mbReferenceMap.set(index, !this.mbReferenceMap.get(index));
  }

  isMBReferenceActive(index: number) {
    return this.mbReferenceMap.get(index);
  }

  onToggleMorePayments() {
    if (this.invoicesCurrentLimit === this.invoices.length) {
      this.invoicesCurrentLimit = this.invoicesDefaultLimit;
    } else {
      this.invoicesCurrentLimit = this.invoices.length;
    }
  }

}
