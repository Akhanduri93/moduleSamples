import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SignupService } from './signup.service';
import { SignupServiceMock } from '../mocks/signup.service.mock';
import { StorageMock } from '../mocks/storage.mock';
import { of } from 'rxjs';
import { SignupUser } from '../../shared/models/signupuser';
import { Nif } from '../../shared/models/nif';
import { SignupCategories, SignupSubCategories } from '../../shared/models/signupcategories';

describe('SignupService', () => {
  let service: SignupService;
  const signupMock: SignupServiceMock = new SignupServiceMock();
  const storageMock: StorageMock = new StorageMock();
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new SignupService(<any>httpClientSpy);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SignupService]
    });
  });

  it('should be created', inject([SignupService], (signupService: SignupService) => {
    expect(signupService).toBeTruthy();
  }));

  it('When validate is called with present nif value should return the nif parsed to the component, should be a get method' +
    'should have the endpoint well specified and should be called only once', () => {
      storageMock.setLocalStorage();
      httpClientSpy.post.and.returnValue(of(signupMock.nifs[0]));
      const testUser = new SignupUser();
      testUser.fullaname = 'Rajendra Kandpal';
      testUser.email = 'rajendrakumar.kandpal@gmail.com';
      testUser.tele = '914573347';
      testUser.type = 'vendor';
      service.validate('111111111', testUser).subscribe(
        (response: Nif) => {
          expect(response.companyname).toEqual(signupMock.nifs[0].companyName);
          expect(response.address).toEqual(signupMock.nifs[0].address);
          expect(response.city).toEqual(signupMock.nifs[0].city);
          expect(response.postalCode).toEqual(signupMock.nifs[0].postalcode);
          expect(response.sfid).toEqual(signupMock.nifs[0].sfid);
          expect(response.contacts.length).toEqual(signupMock.nifs[0].contacts.length);
        });
      expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    });

  it('getFirstLastNames should return firstname lastname array of size 2', () => {
    const compleName = service.getFirstLastNames('Andre Antonio Santos');
    expect(compleName.length).toBe(2);
    expect(compleName[0]).not.toBeNull();
    expect(compleName[1]).not.toBeNull();
  });

  it('prepareContacts should prepare contact payload when passed the user', () => {
    const testUser = new SignupUser();
    testUser.aboutCompany = 'ABC';
    testUser.address = 'RUA BARATA SALGUEIRO, 28 3º, 4º E 5º';
    testUser.cargo = '';
    testUser.city = 'LISBOA';
    testUser.companyname = 'SOCIEDADE EXEMPLO,LDA';
    testUser.email = 'accoriea@candor.pt';
    testUser.fullaname = 'Rajendra Kandpal';
    testUser.nif = '111111111';
    testUser.pass = 'abcdefgh';
    testUser.postalCode = '1234-000';
    testUser.power = true;
    testUser.powerName = 'Rajendrakumar Kandpal';
    testUser.type = 'vendor';
    testUser.tele = '123456789';
    testUser.sfid = '00Q0E00000LjHZEUA3';
    const completeName = service.getFirstLastNames(testUser.powerName);

    const contactPayLoad = service.prepareContacts(testUser);
    if (testUser.power === true) {
      expect(contactPayLoad.length).toBe(1);
      expect(contactPayLoad[0].firstname).toBe(completeName[0]);
      expect(contactPayLoad[0].lastname).toBe(completeName[1]);
      expect(contactPayLoad[0].department).toBe(testUser.cargo);
      expect(contactPayLoad[0].username__c).toBe(testUser.email);
      expect(contactPayLoad[0].master__c).toBe(testUser.power);
      expect(contactPayLoad[0].mobilephone).toBe(testUser.tele);
      expect(contactPayLoad[0].send_invoice__c).toBe(true);
    } else {
      expect(contactPayLoad.length).toBe(2);
    }
  });

  it('registerUser send post request when passed with user data', () => {
    httpClientSpy.post.and.returnValue(of('{code: 0,success: true}'));
    const testUserCategories: SignupCategories[] = [];
    const testCategories = new SignupCategories();
    const testSubCategory = new SignupSubCategories();
    testCategories.catename = 'Communications';
    testSubCategory.subcatName = 'Conferencing';
    testCategories.subcategories.push(testSubCategory);
    testUserCategories.push(testCategories);
    const testUser = new SignupUser();
    testUser.aboutCompany = 'ABC';
    testUser.address = 'RUA BARATA SALGUEIRO, 28 3º, 4º E 5º';
    testUser.cargo = 'GER';
    testUser.city = 'LISBOA';
    testUser.companyname = 'SOCIEDADE EXEMPLO,LDA';
    testUser.email = 'accoriea@candor.pt';
    testUser.fullaname = 'Rajendra Kandpal';
    testUser.nif = '111111111';
    testUser.pass = 'abcdefgh';
    testUser.postalCode = '1234-000';
    testUser.power = true;
    testUser.powerName = 'Rajendrakumar Kandpal';
    testUser.type = 'vendor';
    testUser.tele = '123456789';
    testUser.sfid = '00Q0E00000LjHZEUA3';
    testUser.categories = testUserCategories;
    const parsedIndustries = service.perpareIndustries(testUser);
    // console.log(parsedIndustries);
    service.registerUser(testUser).subscribe((response) => {
      expect(response).toBe('{code: 0,success: true}');
      expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    });
  });

  it('parseNif should parse the payload and prepare nif object', () => {
    const nif = service.parseNif(signupMock.nifs[0]);
    expect(nif.companyname).toBe(signupMock.nifs[0].companyName);
    expect(nif.nif).toBe(signupMock.nifs[0].taxPayerNumber);
    expect(nif.address).toBe(signupMock.nifs[0].address);
    expect(nif.postalCode).toBe(signupMock.nifs[0].postalcode);
    expect(nif.city).toBe(signupMock.nifs[0].city);
    expect(nif.contacts.length).toBe(signupMock.nifs[0].contacts.length);
  });

});
