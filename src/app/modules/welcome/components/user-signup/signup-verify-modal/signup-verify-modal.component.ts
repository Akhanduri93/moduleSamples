import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SignupUser } from '../../../../../shared/models/signupuser';

@Component({
  moduleId: module.id,
  selector: 'app-signup-verify-modal',
  templateUrl: './signup-verify-modal.component.html',
  styleUrls: ['./signup-verify-modal.component.scss']
})

export class SignupVerifyComponent implements OnInit {

  signupVerifyForm: FormGroup;
  verifyData: SignupUser;
  verifyNo = new EventEmitter();
  teleNumber: string;

  constructor(
    public dialogRef: MatDialogRef<SignupVerifyComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.verifyData = data;
  }

  ngOnInit() {
    this.setSignupVerifyForm();
  }

  setTeleNumber(userData: SignupUser) {
    if (userData.tele !== undefined) {
      const teleNo = userData.tele;
      const lastTwoChars = teleNo.slice(-2);
      const teleSubstring = userData.tele.substr(0, (userData.tele.length - 2));
      const maskString = teleSubstring.replace(/./g, '*');
      const formatedString = maskString + lastTwoChars;

      return formatedString;
    }
  }

  setSignupVerifyForm() {
    this.signupVerifyForm = new FormGroup({
      code: new FormControl('', [Validators.required]),
    });
  }

  verify(verifyForm: FormGroup) {
    if (verifyForm.valid) {
      const verifyOperation = {
        code: verifyForm.controls['code'].value,
        data: this.verifyData
      };
      this.verifyNo.emit(verifyOperation);
    }
  }
}
