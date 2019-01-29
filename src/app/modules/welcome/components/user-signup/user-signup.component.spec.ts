import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserSignupComponent } from './user-signup.component';
import { SharedModule } from '../../../../shared/shared.module';
import { AppMaterialModule } from '../../../../shared/app-material.module';
import { VerificationServiceMock } from '../../../../core/mocks/verification.service.mock';
import { SignupServiceMock } from '../../../../core/mocks/signup.service.mock';
import { AuthenticationServiceMock } from '../../../../core/mocks/authentication.service.mock';
import { AuthenticationService } from '../../../../core/http/authentication.service';
import { SignupUser } from '../../../../shared/models/signupuser';

describe('User Signup Form Component Integration', () => {
  let component: UserSignupComponent;
  let fixture: ComponentFixture<UserSignupComponent>;

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
      declarations: [UserSignupComponent],
      providers: [
        VerificationServiceMock,
        SignupServiceMock,
        { provide: AuthenticationService, useClass: AuthenticationServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSignupComponent);
    component = fixture.componentInstance;
    component.user = new SignupUser();
    fixture.detectChanges();
  });

  it('component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should have user signup form', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('form'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
  });

  it('should have user signup form button and spelled correctly', () => {
    const comparetText = 'Criar Conta';
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('button'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
    expect(el.innerText.toLowerCase()).toContain(comparetText.toLowerCase());
  });

  it('button should not be enabled when name not provided', () => {
    fixture.detectChanges();
    component.userSignupForm.controls['nomeconta'].setValue('');
    const de = fixture.debugElement.query(By.css('button'));
    const el: HTMLElement = de.nativeElement;
    el.click();
    fixture.detectChanges();
    expect(el).not.toBeNull();
    expect(el.hasAttribute('disabled')).toBe(true);
  });

  it('button should not be enabled when name provided in wrong format', () => {
    fixture.detectChanges();
    component.userSignupForm.controls['nomeconta'].setValue('123');
    const de = fixture.debugElement.query(By.css('button'));
    const el: HTMLElement = de.nativeElement;
    el.click();
    fixture.detectChanges();
    expect(el).not.toBeNull();
    expect(el.hasAttribute('disabled')).toBe(true);
  });

  it('button should not be enabled when email not provided', () => {
    fixture.detectChanges();
    component.userSignupForm.controls['email'].setValue('');
    const de = fixture.debugElement.query(By.css('button'));
    const el: HTMLElement = de.nativeElement;
    el.click();
    fixture.detectChanges();
    expect(el).not.toBeNull();
    expect(el.hasAttribute('disabled')).toBe(true);
  });

  it('button should not be enabled when email provided in wrong format', () => {
    fixture.detectChanges();
    component.userSignupForm.controls['email'].setValue('aa@');
    const de = fixture.debugElement.query(By.css('button'));
    const el: HTMLElement = de.nativeElement;
    el.click();
    fixture.detectChanges();
    expect(el).not.toBeNull();
    expect(el.hasAttribute('disabled')).toBe(true);
  });

  it('button should not be enabled when tele provided in wrong format', () => {
    fixture.detectChanges();
    component.userSignupForm.controls['tele'].setValue('aa');
    const de = fixture.debugElement.query(By.css('button'));
    const el: HTMLElement = de.nativeElement;
    el.click();
    fixture.detectChanges();
    expect(el).not.toBeNull();
    expect(el.hasAttribute('disabled')).toBe(true);
  });

  it('button should not be enabled when tele not provided', () => {
    fixture.detectChanges();
    component.userSignupForm.controls['tele'].setValue('');
    const de = fixture.debugElement.query(By.css('button'));
    const el: HTMLElement = de.nativeElement;
    el.click();
    fixture.detectChanges();
    expect(el).not.toBeNull();
    expect(el.hasAttribute('disabled')).toBe(true);
  });

  // it('should show correct error message when password not provided', () => {
  //   const comparetText = 'A palavra-passe não pode estar vazia.';
  //   fixture.detectChanges();
  //   component.userSignupForm.controls['password'].markAsTouched();
  //   component.userSignupForm.controls['password'].setValue('');
  //   component.userSignupForm.controls['password'].updateValueAndValidity();
  //   const de = fixture.debugElement.query(By.css('button'));
  //   const el: HTMLElement = de.nativeElement;
  //   el.click();
  //   fixture.detectChanges();
  //   const deError = fixture.debugElement.queryAll(By.css('.mat-error'));
  //   const elError: HTMLElement = deError[3].nativeElement;
  //   expect(elError).not.toBeNull();
  //   expect(elError.innerText.toLowerCase()).toContain(comparetText.toLowerCase());
  // });

  // it('should show correct error message when password provided in wrong format', () => {
  //   const comparetText = 'O tamanho mínimo da palavra-passe são 8 caracteres.';
  //   fixture.detectChanges();
  //   component.userSignupForm.controls['password'].markAsTouched();
  //   component.userSignupForm.controls['password'].setValue('aa');
  //   const de = fixture.debugElement.query(By.css('button'));
  //   const el: HTMLElement = de.nativeElement;
  //   el.click();
  //   fixture.detectChanges();
  //   const deError = fixture.debugElement.queryAll(By.css('.mat-error'));
  //   const elError: HTMLElement = deError[3].nativeElement;
  //   expect(elError).not.toBeNull();
  //   expect(elError.innerText.toLowerCase()).toContain(comparetText.toLowerCase());
  // });
});
