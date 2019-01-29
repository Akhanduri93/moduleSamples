import { ContractSignatureComponent } from './contract-signature.component';
import { ContractSignatureServiceMock } from '../../../../core/mocks/contractSignature.service.mock';
import { throwError, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../../../core/services/loading.service';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';

describe('ContractSignatureComponent', () => {
  let component: ContractSignatureComponent;
  let service;
  let loadingService;
  let activatedRoute: ActivatedRoute;
  let breakpointObserver;
  let router: Router;
  let snackBar: MatSnackBar;
  let dialog: MatDialog;

  beforeEach(() => {
    dialog = jasmine.createSpyObj('dialog', ['open']);
    activatedRoute = jasmine.createSpyObj('activatedRoute', ['params']);
    router = jasmine.createSpyObj('router', ['navigate']);
    breakpointObserver = jasmine.createSpyObj('breakpointObserver', ['observe']);
    snackBar = jasmine.createSpyObj('snackBar', ['openFromComponent']);
    service = new ContractSignatureServiceMock();
    loadingService = new LoadingService();
    activatedRoute.params = of({ id: '3' });
    component = new ContractSignatureComponent(activatedRoute,
      loadingService, breakpointObserver, service, router, snackBar, dialog);
      component.contractSignature = service.contractSignatureTestData.data[0];
  });

  it('should create a component ', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('isLoading should be true when ngOnInit is called  ', () => {
    spyOn(component, 'setLoading');
    component.ngOnInit();
    expect(component.setLoading).toHaveBeenCalled();
  });

  it('when addClause is called isLoading should be true ', () => {
    spyOn(component, 'setLoading');
    component.addClause();
    expect(component.setLoading).toHaveBeenCalled();
  });

  it('isLoading should be false when addClause is called successfully', () => {
    component.ngOnInit();
    component.addClause();
    expect(component.isLoading).toBeFalsy();
  });

  it('contact information will not be added and isLoading should be false,' +
  'when postContractSignData service method is called with error', () => {
    spyOn(service, 'postContractSignData').and.returnValue(throwError(new Error('Error: Failed to fetch data!')));
    component.addClauseInformation();
    expect(component.isLoading).toBeFalsy();
  });

  it('isLoading should be false when getContractSignaturePageData is called with error',
    () => {
      spyOn(service, 'getContractSignaturePageData').and.returnValue(throwError(new Error('Error: Failed to fetch data!')));
      component.ngOnInit();
      expect(component.isLoading).toBeFalsy();
    });

  it('isLoading should be false when postContractSignatureView is called with error',
    () => {
      spyOn(service, 'postContractSignatureView').and.returnValue(throwError(new Error('Error: Failed to fetch data!')));
      component.ngOnInit();
      expect(component.isLoading).toBeFalsy();
    });

    it('should open cancel application dialog box when openCancellationDialog method is called', () => {
      component.openCancellationDialog();
      expect(dialog.open).toHaveBeenCalled();
    });

    it('should open insurance dialog box when openInsuranceDialog method is called', () => {
      component.openInsuranceDialog();
      expect(dialog.open).toHaveBeenCalled();
    });

  it('contractSignature should be null and should unsubcribe all the subscriptions, when ngOnDestroy is called', () => {
    component.routeSubscription = jasmine.createSpyObj('component.routeSubscription', ['unsubscribe']);
    component.contractPageDataSubscription = jasmine.createSpyObj('component.contractPageDataSubscription', ['unsubscribe']);
    component.contractValidationSubscription = jasmine.createSpyObj('component.contractValidationSubscription', ['unsubscribe']);
    component.contractViewSubscription = jasmine.createSpyObj('component.contractViewSubscription', ['unsubscribe']);
    component.contractSignatureIbanDeclarationSubscription =
    jasmine.createSpyObj('component.contractSignatureIbanDeclarationSubscription', ['unsubscribe']);
    component.contractSignatureSignedDataSubscription =
    jasmine.createSpyObj('component.contractSignatureSignedDataSubscription', ['unsubscribe']);
    component.contractSignatureFormSubscription =
    jasmine.createSpyObj('component.contractSignatureFormSubscription', ['unsubscribe']);
    component.ngOnDestroy();
    expect(component.contractSignature).toBeNull();
    expect(component.contact).toBeNull();
    expect(component.routeSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.contractPageDataSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.contractValidationSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.contractViewSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.contractSignatureIbanDeclarationSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.contractSignatureSignedDataSubscription.unsubscribe).toHaveBeenCalled();
  });

});
