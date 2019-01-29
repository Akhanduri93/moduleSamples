import { Component, OnInit, Input } from '@angular/core';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  @Input() progressValue;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]);
  hide = false;
  progressDivider = false;
  constructor(private breakpointObserver: BreakpointObserver, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    if (this.activatedRoute.snapshot.url.length > 0) {
      if (this.activatedRoute.snapshot.url[0].toString() === 'reset-password') {
        this.hide = true;
      }

      if (this.activatedRoute.snapshot.url[0].toString() === 'signup') {
        this.progressDivider = true;
      }
    }
  }
}
