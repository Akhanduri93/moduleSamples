import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserSignupNifComponent } from './user-signup-nif.component';
import { SharedModule } from '../../../../shared/shared.module';
import { AppMaterialModule } from '../../../../shared/app-material.module';
import { SignupServiceMock } from '../../../../core/mocks/signup.service.mock';
import { SignupUser } from '../../../../shared/models/signupuser';
import { SignupService } from '../../../../core/http/signup.service';
import { AuthenticationServiceMock } from '../../../../core/mocks/authentication.service.mock';
import { AuthenticationService } from '../../../../core/http/authentication.service';

describe('UserSignupNifComponent Integration', () => {
  let component: UserSignupNifComponent;
  let fixture: ComponentFixture<UserSignupNifComponent>;

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
      declarations: [UserSignupNifComponent],
      providers: [
        SignupServiceMock,
        { provide: SignupService, useClass: SignupServiceMock },
        { provide: AuthenticationService, useClass: AuthenticationServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSignupNifComponent);
    component = fixture.componentInstance;
    component.user = new SignupUser();
    fixture.detectChanges();
  });

  it('component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should have user nif form', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('form'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
  });

  it('should have user nif form continue button and spelled correctly', () => {
    const expectedBtnText = 'continuar';
    component.user.type = 'vendor';
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('button'));
    const el: HTMLElement = de[1].nativeElement;
    expect(el).not.toBeNull();
    expect(el.innerText.toLowerCase()).toContain(expectedBtnText.toLowerCase());
  });

  it('should have user nif form back button and spelled correctly', () => {
    const btnText = 'Voltar';
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('button'));
    const el: HTMLElement = de[0].nativeElement;
    expect(el).not.toBeNull();
    expect(el.innerText.toLowerCase()).toContain(btnText.toLowerCase());
  });

  it('should have nif informative text section and with correct content', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.field-info-text'));
    const el: HTMLElement = de[0].nativeElement;
    expect(el).not.toBeNull();
    expect(el.innerText).toContain('Através do NIF conseguimos pré-preencher o formulário de adesão com dados da Informa D&B.');
  });

  it('should show only nif and legal name fields on initialization', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.mat-input-element'));
    expect(de.length).toBe(2);
  });

  it('should not enable submit button when nif not provided', () => {
    component.user.type = 'vendor';
    fixture.detectChanges();
    component.userSignupNifForm.controls['nif'].setValue('');
    component.userSignupNifForm.controls['nif'].updateValueAndValidity();

    const de = fixture.debugElement.queryAll(By.css('button'));
    const el: HTMLElement = de[1].nativeElement;
    expect(el).not.toBeNull();
    expect(el.hasAttribute('disabled')).toBe(true);
  });

  it('should not enable submit buttonwhen nif provided in wrong format', () => {
    component.user.type = 'vendor';
    fixture.detectChanges();
    component.userSignupNifForm.controls['nif'].setValue('aa');
    const de = fixture.debugElement.queryAll(By.css('button'));
    const el: HTMLElement = de[1].nativeElement;
    expect(el).not.toBeNull();
    expect(el.hasAttribute('disabled')).toBe(true);
  });

  it('should show other fields once nif is changed with formatted value in nif field', () => {
    fixture.detectChanges();
    component.userSignupNifForm.controls['nif'].setValue('505934620');
    fixture.detectChanges();
    const deInPut = fixture.debugElement.queryAll(By.css('.mat-input-element'));
    const el: HTMLInputElement = deInPut[0].nativeElement;
    el.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    const deInPutNew = fixture.debugElement.queryAll(By.css('.mat-input-element'));
    expect(deInPutNew.length).toBeGreaterThan(2);
    expect(deInPutNew.length).toBe(5);
  });

  it('should show contact list section on nif form once nif is provided or updated ', () => {
    fixture.detectChanges();
    component.userSignupNifForm.controls['nif'].setValue('505934620');
    fixture.detectChanges();
    const deInPut = fixture.debugElement.queryAll(By.css('.mat-input-element'));
    const el: HTMLInputElement = deInPut[0].nativeElement;
    el.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    const deInPutNew = fixture.debugElement.queryAll(By.css('.user-name'));
    expect(deInPutNew).not.toBeNull();
  });

  it('should show informative section once nif details are loaded', () => {
    fixture.detectChanges();
    component.userSignupNifForm.controls['nif'].setValue('505934620');
    fixture.detectChanges();
    const deInPut = fixture.debugElement.queryAll(By.css('.mat-input-element'));
    const el: HTMLInputElement = deInPut[0].nativeElement;
    el.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    const deInfoText = fixture.debugElement.queryAll(By.css('.field-info-text'));
    const elInfoText: HTMLElement = deInfoText[1].nativeElement;
    expect(elInfoText).not.toBeNull();
    expect(elInfoText.innerText).toContain('A pessoa indicada com poder para obrigar a empresa será contactada ');
  });
});
