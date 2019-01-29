import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { SharedModule } from '../../../../shared/shared.module';
import { AppMaterialModule } from '../../../../shared/app-material.module';

import { UnavailableComponent } from './unavailable.component';

import { AuthenticationServiceMock } from '../../../../core/mocks/authentication.service.mock';
import { AuthenticationService } from '../../../../core/http/authentication.service';

describe('UnavailableComponent Spec Test', () => {
  let component: UnavailableComponent;
  let fixture: ComponentFixture<UnavailableComponent>;

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
        UnavailableComponent
      ],
      providers: [
        { provide: AuthenticationService, useClass: AuthenticationServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnavailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have message and spelled correctly ', () => {
    const de = fixture.debugElement.queryAll(By.css('h2'));
    const mmsEl1: HTMLElement = de[0].nativeElement;
    expect(mmsEl1).not.toBeNull();
    expect(mmsEl1.innerText).toContain('Oops…');

    const mmsEl2: HTMLElement = de[1].nativeElement;
    expect(mmsEl2).not.toBeNull();
    expect(mmsEl2.innerText).toContain('Estamos com algum problema no servidor');
  });

  it('should have a button with text spelled correctly, and should have a link to liquid', () => {
    const de = fixture.debugElement.query(By.css('a'));
    const el: HTMLAnchorElement = de.nativeElement;
    expect(el).not.toBeNull();
    expect(el.innerText).toContain('VOLTAR');
    expect(el.href).toEqual('http://liqui.do/');
  });
});
