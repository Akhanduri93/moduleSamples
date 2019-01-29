import { fakeAsync, tick } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material';
import { ResetPasswordModalComponent } from './reset-password-modal.component';

describe('DeleteUserModalComponent', () => {
    let component: ResetPasswordModalComponent;
    let dialogref: MatDialogRef<ResetPasswordModalComponent>;
    beforeEach(() => {

      dialogref = jasmine.createSpyObj('dialogRef', ['close']);
      component = new ResetPasswordModalComponent(dialogref);
    });

    it('component should be defined', () => {
        expect(component).toBeDefined();
    });

    it('confirmClose should initate a call to Close Dialog', fakeAsync(() => {
     tick();
        component.confirmPasswordChange();
        expect(dialogref.close).toHaveBeenCalled();
    }));
  });
