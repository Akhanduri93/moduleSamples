import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { SharedModule } from '../../../../shared/shared.module';
import { AppMaterialModule } from '../../../../shared/app-material.module';

import { PageNotFoundComponent } from './pagenotfound.component';

import { AuthenticationServiceMock } from '../../../../core/mocks/authentication.service.mock';
import { AuthenticationService } from '../../../../core/http/authentication.service';

describe('PageNotFoundComponent Spec Test', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes([]),
        SharedModule,
        ReactiveFormsModule,
        AppMaterialModule,
        FormsModule
      ],
      declarations: [
        PageNotFoundComponent
      ],
      providers: [
        { provide: AuthenticationService, useClass: AuthenticationServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have not found message and spelled correctly with class mat-display-1 applied to element', () => {
    const de = fixture.debugElement.query(By.css('.mat-display-1'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
    expect(el.innerText).toContain('Parece que está perdido');
  });

  it('should have a button with text spelled correctly, and should have a link to dashboard', () => {
    const de = fixture.debugElement.query(By.css('a'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
    expect(el.innerText.toLowerCase()).toContain('Voltar à página inicial'.toLowerCase());
    expect(de.properties.href).toEqual('/portal/dashboard/contracts');
  });

  it('should show information and should be spelled correctly', () => {
    const de = fixture.debugElement.query(By.css('.mat-body-1'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
    expect(el.innerText).toContain('Não conseguimos encontrar a página que procura');
  });
});
