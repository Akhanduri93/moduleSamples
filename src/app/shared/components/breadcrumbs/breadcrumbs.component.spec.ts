import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { AppMaterialModule } from '../../app-material.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('BreadcrumbsComponent Integration', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, RouterTestingModule],
      declarations: [BreadcrumbsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should show the arrow link', () => {
    const de = fixture.debugElement.queryAll(By.css('a'))[0].nativeElement;
    expect(de).not.toBeNull();
  });

  it('should have the link', () => {
    component.breadcrumbs = [
      { link: '/portal/dashboard/contracts', description: 'Dashboard' }
    ];
    fixture.detectChanges();
    const deBreadcrumb = fixture.debugElement.queryAll(By.css('a'))[1].nativeElement;
    expect(deBreadcrumb).not.toBeNull();
  });

  it('should have the link', () => {
    component.breadcrumbs = [
      { link: null, description: 'Detalhe' }
    ];
    fixture.detectChanges();
    const deBreadcrumb = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(deBreadcrumb).not.toBeNull();
  });

});
