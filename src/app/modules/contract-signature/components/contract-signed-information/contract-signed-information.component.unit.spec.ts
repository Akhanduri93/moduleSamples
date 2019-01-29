import { ContractSignedInformationComponent } from './contract-signed-information.component';

describe('ContractSignedInformationComponent', () => {
  let component: ContractSignedInformationComponent;
  let router;
  let breakpointObserver;

  beforeEach(() => {
    router = jasmine.createSpyObj('router', ['navigate']);
    breakpointObserver = jasmine.createSpyObj('breakpointObserver', ['observe']);
    component = new ContractSignedInformationComponent(router, breakpointObserver);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('signedInfo should be null when ngOnDestroy is called', () => {
    component.ngOnDestroy();
    expect(component.signedInfo).toBeNull();
  });
});
