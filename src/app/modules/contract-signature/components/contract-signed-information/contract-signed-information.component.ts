import { Component, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contract-signed-information',
  templateUrl: './contract-signed-information.component.html',
  styleUrls: ['./contract-signed-information.component.scss']
})
export class ContractSignedInformationComponent implements OnDestroy {

  @Input() signedInfo: any;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe([Breakpoints.XSmall]);
  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver) {
  }

  ngOnDestroy() {
    this.signedInfo = null;
  }

  navigateTo() {
    this.router.navigate(['/']);
  }
}
