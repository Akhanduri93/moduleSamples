import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertBarComponent } from './alert-bar.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

describe('AlertBarComponent', () => {
  let component: AlertBarComponent;
  let fixture: ComponentFixture<AlertBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertBarComponent ],
      providers: [{
        provide: MAT_SNACK_BAR_DATA,
        useValue: {}
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
