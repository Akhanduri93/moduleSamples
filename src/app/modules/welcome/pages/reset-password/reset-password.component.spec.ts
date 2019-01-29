import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordComponent } from './reset-password.component';
import { WelcomeTextComponent } from '../../components/welcome-text/welcome-text.component';
import { WelcomeComponent } from '../../components/welcome/welcome.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../../../shared/app-material.module';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationServiceMock } from '../../../../core/mocks/authentication.service.mock';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SharedModule } from '../../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../../../../core/http/authentication.service';
import { from } from 'rxjs';
import { CommonModule } from '../../../../../../node_modules/@angular/common';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ResetPasswordComponent Integration', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        AppMaterialModule,
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [
        ResetPasswordComponent,
        WelcomeTextComponent,
        WelcomeComponent
      ],
      providers: [
        { provide: AuthenticationService, useClass: AuthenticationServiceMock },
        { provide: ActivatedRoute, useValue: { 'params': from([{ 'token': 'test-token' }]), snapshot: { url: ['reset-password'] } } },
        BreakpointObserver
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title inside the mat-card and a subtitle', () => {
    const matCardTitle = 'Alterar palavra-passe';
    const de = fixture.debugElement.query(By.css('mat-card-title'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
    expect(el.innerText).toContain(matCardTitle);
  });

  it('should contain a form ', () => {
    const de = fixture.debugElement.query(By.css('form'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
  });

  it('should get button', () => {
    const title = 'Alterar';
    const de = fixture.debugElement.query(By.css('.mat-flat-button'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
    expect(el.innerText.toLowerCase()).toContain(title.toLowerCase());
  });

});
