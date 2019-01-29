import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../../../../shared/shared.module';
import { AppMaterialModule } from '../../../../shared/app-material.module';
import { WelcomeComponent } from '../../components/welcome/welcome.component';
import { LoginComponent } from './login.component';
import { TermsConditionsComponent } from '../../components/terms-conditions/terms-conditions.component';
import { WelcomeTextComponent } from '../../components/welcome-text/welcome-text.component';
import { AuthenticationServiceMock } from '../../../../core/mocks/authentication.service.mock';
import { AuthenticationService } from '../../../../core/http/authentication.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent Integration', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([]),
        SharedModule,
        ReactiveFormsModule,
        AppMaterialModule,
        FormsModule
      ],
      declarations: [
        LoginComponent,
        TermsConditionsComponent,
        WelcomeTextComponent,
        WelcomeComponent
      ],
      providers: [
        { provide: AuthenticationService, useClass: AuthenticationServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title inside the mat-card and a subtitle', () => {
    const matCardTitle = 'Iniciar Sessão';
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('h1'));
    const el: HTMLElement = de.nativeElement;

    const de1 = fixture.debugElement.query(By.css('p'));
    const el1: HTMLElement = de1.nativeElement;
    expect(el).not.toBeNull();
    expect(el.innerText).toContain(matCardTitle);
    expect(el1).not.toBeNull();
  });

  it('should contain a form', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('form'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
  });

  it('should have a button to log in the system', () => {
    const saveButton = 'Seguinte';
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('button'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
    expect(el.innerText.toLowerCase()).toContain(saveButton.toLowerCase());
  });

  it('should contain a link for the recover password', () => {
    const recoverPassword = 'Esqueceu a sua palavra-passe?';
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('a.mat-body-2'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
    expect(el.innerText).toContain(recoverPassword);
  });

  it('should contain a mat-checkbox for remember the credentials', () => {
    const matCheckboxText = 'Lembrar-me mais tarde';
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('mat-checkbox'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
    expect(el.innerText).toContain(matCheckboxText);
  });

});
