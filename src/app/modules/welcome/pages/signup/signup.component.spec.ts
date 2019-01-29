import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeComponent } from '../../components/welcome/welcome.component';
import { SignupComponent } from './signup.component';
import { UserSignupComponent } from '../../components/user-signup/user-signup.component';
import { UserSignupNifComponent } from '../../components/user-signup-nif/user-signup-nif.component';
import { UserSignupCatComponent } from '../../components/user-signup-cat/user-signup-cat.component';
import { SignupInfoTextComponent } from '../../components/signup-infotext/signup-infotext.component';
import { SharedModule } from '../../../../shared/shared.module';
import { AppMaterialModule } from '../../../../shared/app-material.module';
import { VerificationServiceMock } from '../../../../core/mocks/verification.service.mock';
import { SignupServiceMock } from '../../../../core/mocks/signup.service.mock';
import { NifServiceMock } from '../../../../core/mocks/nif.service.mock';
import { SignupCategoriesServiceMock } from '../../../../core/mocks/signupcategories.service.mock';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationServiceMock } from '../../../../core/mocks/authentication.service.mock';
import { AuthenticationService } from '../../../../core/http/authentication.service';

describe('Signup Component Integration', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

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
        SignupComponent,
        UserSignupComponent,
        UserSignupNifComponent,
        UserSignupCatComponent,
        SignupInfoTextComponent,
        WelcomeComponent
      ],
      providers: [
        VerificationServiceMock,
        SignupServiceMock,
        NifServiceMock,
        SignupCategoriesServiceMock,
        AuthenticationServiceMock,
        AuthenticationService,
        { provide: AuthenticationService, useClass: AuthenticationServiceMock },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              url: ['client', 'client']
            }
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should have section for signup form', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('app-user-signup'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
  });

  it('should have section for signup info text', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('app-signup-infotext'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
  });
});
