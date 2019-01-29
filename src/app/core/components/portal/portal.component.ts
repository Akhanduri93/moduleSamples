import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { UserManagement } from '../../../shared/models/user';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
})

export class PortalComponent implements OnInit {

  currentUser: UserManagement;
  users: UserManagement[] = [];
  hostClass: boolean;
  changeDetector: ChangeDetectorRef;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]);
  loadingValue = 0;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver,
    private loadingService: LoadingService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')); // TODO: review if this is necessary
  }

  ngOnInit() {
    // this.loadAllUsers();
    this.loadingService.getValue().subscribe(value => { this.loadingValue = value; });
  }
  onActivate(event) {
    console.log('event', event);
  }

  toggleHostClass(open: boolean) {
    this.hostClass = open;
    this.changeDetectorRef.detectChanges();
  }

  // deleteUser(_id: string) {
  //   this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
  // }
  //
  // private loadAllUsers() {
  //   this.userService.getAll().subscribe(users => { this.users = users; });
  // }

}
