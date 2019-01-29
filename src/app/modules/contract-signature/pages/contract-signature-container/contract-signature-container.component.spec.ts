import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractSignatureContainerComponent } from './contract-signature-container.component';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from '../../../../shared/app-material.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('ContractSignatureContainerComponent', () => {
  let component: ContractSignatureContainerComponent;
  let fixture: ComponentFixture<ContractSignatureContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, AppMaterialModule, RouterTestingModule],
      declarations: [ ContractSignatureContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractSignatureContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have mat-toolbar section', () => {
    const de = fixture.debugElement.query(By.css('mat-toolbar')).nativeElement;
    expect(de).not.toBeNull();
  });

  it('should have mat-divider', () => {
    const de = fixture.debugElement.query(By.css('mat-divider')).nativeElement;
    expect(de).not.toBeNull();
  });

  it('should have router-outlet', () => {
    const de = fixture.debugElement.query(By.css('router-outlet')).nativeElement;
    expect(de).not.toBeNull();
  });

});
