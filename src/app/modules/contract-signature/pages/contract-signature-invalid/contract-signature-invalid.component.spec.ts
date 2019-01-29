import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractSignatureInvalidComponent } from './contract-signature-invalid.component';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ContractSignatureInvalidComponent', () => {
  let component: ContractSignatureInvalidComponent;
  let fixture: ComponentFixture<ContractSignatureInvalidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContractSignatureInvalidComponent],
      imports: [BrowserAnimationsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractSignatureInvalidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    const de = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(de.innerText).toBe('Documento expirado.');
  });

  it('should have svg image', () => {
    const de = fixture.debugElement.query(By.css('svg')).nativeElement;
    expect(de).not.toBeNull();
  });
});
