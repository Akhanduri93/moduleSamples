import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SignupVerifyComponent } from './signup-verify-modal.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { AppMaterialModule } from '../../../../../shared/app-material.module';

describe('Verify number modal Integration', () => {
  let component: SignupVerifyComponent;
  let fixture: ComponentFixture<SignupVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
        SharedModule,
        AppMaterialModule
      ],
      declarations: [
        SignupVerifyComponent
      ],
      providers: [{
        provide: MatDialogRef,
        useValue: {
          close: (dialogResult: any) => { }
        }
      },
      {
        provide: MAT_DIALOG_DATA,
        useValue: {
          data: {}
        }
      }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should have title for the modal and should be spelled correctly', () => {
    const comparetText = 'Introduza código';
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('h3'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();

    expect(el.innerText.toLowerCase()).toContain(comparetText.toLowerCase());
  });

  it('should have verification form integrated', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('form'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
  });

  it('should have submit button for form integrated', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('button'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
  });
});
