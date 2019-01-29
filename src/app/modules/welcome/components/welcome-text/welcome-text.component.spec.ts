import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeTextComponent } from './welcome-text.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../../shared/shared.module';
import { AppMaterialModule } from '../../../../shared/app-material.module';

describe('WelcomeTextComponent', () => {
  let component: WelcomeTextComponent;
  let fixture: ComponentFixture<WelcomeTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeTextComponent],
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
    fixture = TestBed.createComponent(WelcomeTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
