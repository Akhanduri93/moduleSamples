import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordModalComponent } from './reset-password-modal.component';
import { AppMaterialModule } from '../../../../shared/app-material.module';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

describe('ResetPasswordModalComponent', () => {
  let component: ResetPasswordModalComponent;
  let fixture: ComponentFixture<ResetPasswordModalComponent>;
  let matDialogRef: MatDialogRef<ResetPasswordModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResetPasswordModalComponent,
      ],
      imports: [
        AppMaterialModule,
        MatDialogModule
      ],
      providers:
        [
          { provide: MatDialogRef, useValue: {} },
        ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordModalComponent);
    component = fixture.componentInstance;
    matDialogRef = jasmine.createSpyObj('dialogRef', ['close']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get title', () => {
    fixture.detectChanges();
    const title = 'Palavra-passe alterada com successo!';
    const de = fixture.debugElement.query(By.css('h1'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
    expect(el.innerText).toContain(title);
  });

  it('should get button', () => {
    fixture.detectChanges();
    const title = 'Ok';
    const de = fixture.debugElement.query(By.css('.mat-flat-button'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
    expect(el.innerText.toLowerCase()).toContain(title.toLowerCase());
  });
});
