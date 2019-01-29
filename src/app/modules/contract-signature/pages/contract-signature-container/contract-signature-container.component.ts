import { Component } from '@angular/core';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contract-signature-container',
  templateUrl: './contract-signature-container.component.html',
  styleUrls: ['./contract-signature-container.component.scss']
})
export class ContractSignatureContainerComponent {
  /*
     :::::::----signature Values check----:::::: 
  */ 
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]);

  constructor(private breakpointObserver: BreakpointObserver) { }

}
