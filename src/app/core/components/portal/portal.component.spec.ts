import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PortalComponent } from './portal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { TopNavComponent } from '../top-nav/top-nav.component';
import { AppMaterialModule } from '../../../shared/app-material.module';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { StorageMock } from '../../mocks/storage.mock';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PortalComponent', () => {
  let component: PortalComponent;
  let fixture: ComponentFixture<PortalComponent>;
  let storageMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([]),
        AppMaterialModule,
        SharedModule,
      ],
      declarations: [
        PortalComponent,
        TopNavComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    // required for top-nav component
    storageMock = new StorageMock();
    storageMock.setLocalStorage();

    fixture = TestBed.createComponent(PortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have a router outlet', () => {
    const de = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(de).not.toBeNull();
  });
});
