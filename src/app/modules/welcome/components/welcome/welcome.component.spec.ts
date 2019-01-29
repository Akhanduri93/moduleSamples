import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../../../shared/app-material.module';
import { By } from '@angular/platform-browser';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes([]),
        SharedModule,
        ReactiveFormsModule,
        AppMaterialModule,
      ],
      declarations: [WelcomeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a mat toolbar on top of the page', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.top'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
  });

  it('toolbar should contain an icon', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.logo'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
  });

});
