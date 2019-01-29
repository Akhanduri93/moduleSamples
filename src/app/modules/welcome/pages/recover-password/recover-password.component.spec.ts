import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RecoverPasswordComponent } from './recover-password.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../../../shared/app-material.module';
import { TermsConditionsComponent } from '../../components/terms-conditions/terms-conditions.component';
import { WelcomeTextComponent } from '../../components/welcome-text/welcome-text.component';
import { WelcomeComponent } from '../../components/welcome/welcome.component';
import { AuthenticationServiceMock } from '../../../../core/mocks/authentication.service.mock';
import { By } from '@angular/platform-browser';
import { AuthenticationService } from '../../../../core/http/authentication.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RecoverPasswordComponent Integration', () => {
  let component: RecoverPasswordComponent;
  let fixture: ComponentFixture<RecoverPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([]),
        SharedModule,
        ReactiveFormsModule,
        AppMaterialModule],
      declarations: [
        RecoverPasswordComponent,
        TermsConditionsComponent,
        WelcomeTextComponent,
        WelcomeComponent],
      providers: [
        { provide: AuthenticationService, useClass: AuthenticationServiceMock },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title inside the mat-card and a subtitle', () => {
    const matCardTitle = 'Esqueceu a sua password?';
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

  it('should have a button to recover password', () => {
    const saveButton = 'Enviar';
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.mat-flat-button'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
    expect(el.innerText.toLowerCase()).toContain(saveButton.toLowerCase());
  });

  it('should have an anchor to go back to the LOGIN page', () => {
    const recoverPassword = 'arrow_back Voltar ao Login';
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('a.back'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
    expect(el.innerText).toContain(recoverPassword);
  });

});
