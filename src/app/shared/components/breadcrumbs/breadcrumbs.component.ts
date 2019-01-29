import { Component, Input, OnDestroy } from '@angular/core';
import { Breadcrumb } from '../../models/breadcrumb';
import { BreakpointState, Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnDestroy {
  @Input() breadcrumbs: Breadcrumb[];
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe([Breakpoints.XSmall]);

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnDestroy() {
    this.breadcrumbs = null;
  }
}

