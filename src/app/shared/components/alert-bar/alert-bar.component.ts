import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-alert-bar',
  templateUrl: './alert-bar.component.html',
  styleUrls: ['./alert-bar.component.scss']
})

export class AlertBarComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data) {
  }

}
