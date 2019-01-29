import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-reset-password-modal',
  templateUrl: './reset-password-modal.component.html',
  styleUrls: ['./reset-password-modal.component.scss']
})
export class ResetPasswordModalComponent {

  constructor(private dialogRef: MatDialogRef<ResetPasswordModalComponent>) {
  }

  confirmPasswordChange() {
    this.dialogRef.close();
  }


}
