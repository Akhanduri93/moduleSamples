import { BreadcrumbsComponent } from './breadcrumbs.component';

describe('Component: BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let breakpointObserver;
  beforeEach(() => {
    breakpointObserver = jasmine.createSpyObj('breakpointObserver', ['observe']);
    component = new BreadcrumbsComponent(breakpointObserver);
  });

  it('should create a component  ', () => {
    expect(component).toBeTruthy();
  });

  it('when ngOnDestroy is called breacrumbs should be null', () => {
    component.ngOnDestroy();
    expect(component.breadcrumbs).toBeNull();
  });
});
