import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CaseService } from './case.service';
import { CaseServiceMock } from '../mocks/case.service.mock';
import { AuthenticationService } from './authentication.service';
import { StorageMock } from '../mocks/storage.mock';
import { Utils } from '../../shared/utils';
import { of } from 'rxjs';
import { Case } from '../../shared/models/case';

xdescribe('CaseService Test', () => {
 // let injector: TestBed;
  let service: CaseService;
  // let httpMock: HttpTestingController;
  const caseMock: CaseServiceMock = new CaseServiceMock();
  const storageMock: StorageMock = new StorageMock();
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };


  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new CaseService(<any>httpClientSpy);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CaseService, AuthenticationService]
    });
  });

  it('should be created', inject([CaseService], (caseService: CaseService) => {
    expect(caseService).toBeTruthy();
  }));

  it('When getCases is called should return the cases parsed to the component, should be a get method' +
  'should have the endpoint well specified and should be called only once', () => {
    storageMock.setLocalStorage();
    httpClientSpy.get.and.returnValue(of(caseMock.cases));
    const currentAccountId: Account = JSON.parse(Utils.getInfoStorage('currentAccount')).id;
    service.getCases().subscribe(
      (response) => {
      expect(response).toEqual(caseMock.cases);
    });
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('When getArticlesByCategory is called should return the artiles parsed to the component, should be a get method' +
  'should have the endpoint well specified and should be called only once', () => {
    storageMock.setLocalStorage();
    httpClientSpy.get.and.returnValue(of(caseMock.articleService.testInsurancesArticles));
    const currentAccountId: Account = JSON.parse(Utils.getInfoStorage('currentAccount')).id;
    service.getArticlesByCategory('insurance').subscribe(
      (response) => {
      expect(response).toEqual(caseMock.articleService.testInsurancesArticles);
    });
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  // it('When getCaseByCaseNumber is called should return the case, should be a get method,'
  // + 'should have the endpoint well specified, should be a GET method and should one be called once', () => {
  //   storageMock.setLocalStorage();
  //   httpClientSpy.get.and.returnValue(of(caseMock.case));
  //   const currentAccountId: Account = JSON.parse(Utils.getInfoStorage('currentAccount')).id;
  //   service.getCaseByCaseNumber('2151544545').subscribe(
  //     (response) => {
  //     expect(response).not.toBe(null);
  //     expect(response).toEqual(caseMock.case);
  //   });
  //   expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  // });

  it('When getAttachments is called should return the attachment associated to the case,' +
  'should have the endpoint well specified, should be  GET method and should one be called once' , () => {
    storageMock.setLocalStorage();
    httpClientSpy.get.and.returnValue(of(caseMock.attachmentsParsed));
    const currentAccountId: Account = JSON.parse(Utils.getInfoStorage('currentAccount')).id;
    service.getAttachments('7').subscribe(response => {
      expect(response).not.toBe(null);
      expect(response).toEqual(caseMock.attachmentsParsed);
    });
    // const req = httpMock.expectOne('https://staging-liquido-api.herokuapp.com/v1/accounts/' + currentAccountId
    //   + '/cases/7/attachments');
    // expect(req.request.method).toBe('GET');
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
  // it('When sendAttachments is called should post the new attachments' , () => {
  //   storageMock.setLocalStorage();
  //   const currentAccountId: Account = JSON.parse(Utils.getInfoStorage('currentAccount')).id;
  //   service.sendAttachments('7', caseMock.caseAttachmentTest).subscribe(response => {
  //     expect(response).not.toBe(null);
  //   });
  //   const req = httpMock.expectOne('https://staging-liquido-api.herokuapp.com/v1/accounts/' + currentAccountId
  //   + '/cases/7/attachments');
  //   expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  // });
  it('When getAttachments is called should return the attachment associated to the case,' +
  'should have the endpoint well specified, should be  GET method and should one be called once' , () => {
    storageMock.setLocalStorage();
    httpClientSpy.get.and.returnValue(of(caseMock.caseComments));
    const currentAccountId: Account = JSON.parse(Utils.getInfoStorage('currentAccount')).id;
    service.getCaseComments('7').subscribe(response => {
      expect(response).not.toBe(null);
      expect(response).toEqual(caseMock.caseComments);
    });
    // const req = httpMock.expectOne('https://staging-liquido-api.herokuapp.com/v1/accounts/' + currentAccountId
    //   + '/cases/7/attachments');
    // expect(req.request.method).toBe('GET');
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

});
