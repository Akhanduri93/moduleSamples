import { ContractClausesComponent } from './contract-clauses.component';

describe('ContractClausesComponent', () => {
  let component: ContractClausesComponent;
  let breakpointObserver;

  beforeEach(() => {
    breakpointObserver = jasmine.createSpyObj('breakpointObserver', ['observe']);
    component = new ContractClausesComponent(breakpointObserver);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('contractClauses should be null when ngOnDestroy is called', () => {
    component.ngOnDestroy();
    expect(component.contractClauses).toBeNull();
  });

});
