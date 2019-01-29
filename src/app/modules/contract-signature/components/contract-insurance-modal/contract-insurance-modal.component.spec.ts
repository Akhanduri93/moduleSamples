import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ContractInsuranceModalComponent } from './contract-insurance-modal.component';
import { AppMaterialModule } from '../../../../shared/app-material.module';
import { MatDialogRef } from '@angular/material';

describe('ContractInsuranceModalComponent', () => {
  let component: ContractInsuranceModalComponent;
  let fixture: ComponentFixture<ContractInsuranceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractInsuranceModalComponent ],
      imports: [AppMaterialModule],
      providers: [
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractInsuranceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the modal title', () => {
    const de = fixture.debugElement.query(By.css('h3'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('Condições gerais de seguro de equipamentos e dados eletrónicos/software em renting');
  });

  it('should contain the cancelar buttons', () => {
    const cancelarButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(cancelarButtonElement.innerText).toBe('CANCELAR');
  });
});
