import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ContractSignatureAlreadySignedComponent } from './contract-signature-already-signed.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ContractSignatureAlreadySignedComponent', () => {
  let component: ContractSignatureAlreadySignedComponent;
  let fixture: ComponentFixture<ContractSignatureAlreadySignedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContractSignatureAlreadySignedComponent],
      imports: [BrowserAnimationsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractSignatureAlreadySignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    const de = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(de.innerText).toBe('Já assinou o contrato!');
  });

  it('should have svg image', () => {
    const de = fixture.debugElement.query(By.css('svg')).nativeElement;
    expect(de).not.toBeNull();
  });
});
