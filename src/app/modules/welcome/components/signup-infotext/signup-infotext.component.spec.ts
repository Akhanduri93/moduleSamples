import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupInfoTextComponent } from './signup-infotext.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../../shared/shared.module';
import { AppMaterialModule } from '../../../../shared/app-material.module';

describe('SignupInfoTextComponent', () => {
  let component: SignupInfoTextComponent;
  let fixture: ComponentFixture<SignupInfoTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupInfoTextComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        SharedModule,
        AppMaterialModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupInfoTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
