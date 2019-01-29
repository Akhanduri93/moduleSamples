import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserSignupCatComponent } from './user-signup-cat.component';
import { SharedModule } from '../../../../shared/shared.module';
import { AppMaterialModule } from '../../../../shared/app-material.module';
import { VerificationServiceMock } from '../../../../core/mocks/verification.service.mock';
import { SignupServiceMock } from '../../../../core/mocks/signup.service.mock';
import { SignupCategoriesServiceMock } from '../../../../core/mocks/signupcategories.service.mock';
import { SignupUser } from '../../../../shared/models/signupuser';
import { NifServiceMock } from '../../../../core/mocks/nif.service.mock';
import { AccountService } from '../../../../core/http/account.service';
import { AccountServiceMock } from '../../../../core/mocks/account.service.mock';
import { SignupService } from '../../../../core/http/signup.service';

describe('User Signup Category Form Component Integration', () => {
  let component: UserSignupCatComponent;
  let fixture: ComponentFixture<UserSignupCatComponent>;

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
      declarations: [UserSignupCatComponent],
      providers: [
        VerificationServiceMock,
        SignupServiceMock,
        NifServiceMock,
        SignupCategoriesServiceMock,
        AccountServiceMock,
        { provide: AccountService, useClass: AccountServiceMock },
        { provide: SignupService, useClass: SignupServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSignupCatComponent);
    component = fixture.componentInstance;
    component.user = new SignupUser();
    fixture.detectChanges();
  });

  it('component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should have user category form', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('form'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
  });

  it('should have user nif form conclude button and spelled correctly', () => {
    const commpareText = 'Concluir';
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('button'));
    const el: HTMLElement = de[1].nativeElement;
    expect(el).not.toBeNull();
    expect(el.innerText.toLowerCase()).toContain(commpareText.toLowerCase());
  });

  it('should have user nif form back button and spelled correctly', () => {
    const commpareText = 'Voltar';
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('button'));
    const el: HTMLElement = de[0].nativeElement;
    expect(el).not.toBeNull();
    expect(el.innerText.toLowerCase()).toContain(commpareText.toLowerCase());
  });

  it('should have nif informative text section and with correct content', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.field-info-text'));
    const el: HTMLElement = de[0].nativeElement;
    expect(el).not.toBeNull();
    expect(el.innerText).
      toContain('Selecione pelo menos uma categoria. Mais tarde poderá gerir esta informação na área de Perfil da Empresa.');
  });

  it('should show all the pulled categories', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('mat-panel-title > mat-checkbox'));
    expect(de.length).toBe(component.categoryFields.length);
  });

  // it('should have text area field to add description', () => {
  //   fixture.detectChanges();
  //   const de = fixture.debugElement.queryAll(By.css('textarea'));
  //   const el: HTMLElement = de[0].nativeElement;
  //   expect(el).not.toBeNull();
  // });
});
