import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContractSignatureService } from './contract-signature.service';
import { ContractSignatureServiceMock } from '../mocks/contractSignature.service.mock';
import { StorageMock } from '../mocks/storage.mock';
import { of } from 'rxjs';
import { Decline, Address } from '../../shared/models/contract-signature';

describe('Contract Signature Service Test', () => {
    let service: ContractSignatureService;
    const signatureMock: ContractSignatureServiceMock = new ContractSignatureServiceMock();
    const storageMock: StorageMock = new StorageMock();
    let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
        service = new ContractSignatureService(<any>httpClientSpy);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ContractSignatureService]
        });
    });

    it('should be created', inject([ContractSignatureService], (signatureService: ContractSignatureService) => {
        expect(signatureService).toBeTruthy();
    }));

    it('should post the contract sign data', () => {
        storageMock.setLocalStorage();
        httpClientSpy.post.and.returnValue(of('{success: true}'));
        service.postContractSignData(signatureMock.signedTestData, '123').subscribe((response) => {
            expect(response).toBe('{success: true}');
            expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
        });
    });

    it('should get the contract validation', () => {
        storageMock.setLocalStorage();
        httpClientSpy.get.and.returnValue(of('{success: true}'));
        service.getContractValidation('123').subscribe((response) => {
            expect(response).toBe('{success: true}');
            expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
        });
    });

    it('should post the contract signature view ', () => {
        storageMock.setLocalStorage();
        httpClientSpy.post.and.returnValue(of('{success: true}'));
        service.postContractSignatureView('123').subscribe((response) => {
            expect(response).toBe('{success: true}');
            expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
        });
    });

    it('should post the contract signature decline data ', () => {
        const declineData = new Decline();
        declineData.reason = 'Test';
        storageMock.setLocalStorage();
        httpClientSpy.post.and.returnValue(of('{success: true}'));
        service.postDeclineContractSignature(declineData, '123').subscribe((response) => {
            expect(response).toBe('{success: true}');
            expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
        });
    });

    it('should update the address data ', () => {
        const addressData = new Address();
        addressData.street = 'Rua do Soutelo';
        addressData.num = '211';
        addressData.floor = '3º Esq.';
        addressData.code = '4653-332';
        addressData.city = 'Vilar do Torno e Alentém';
        addressData.country = 'Portugal';
        storageMock.setLocalStorage();
        httpClientSpy.put.and.returnValue(of('{success: true}'));
        service.putAddress(addressData, '123').subscribe((response) => {
            expect(response).toBe('{success: true}');
            expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
        });
    });

    it('should parse the contract signature data ', () => {
        const contractSignaturePayLoad = service.parseContractSignaturePageData(signatureMock.contractSignatureTestData);
        expect(contractSignaturePayLoad.application).toBe(signatureMock.contractSignatureTestData.data[0].application);
        expect(contractSignaturePayLoad.rents).toBe(signatureMock.contractSignatureTestData.data[0].rents);
        expect(contractSignaturePayLoad.client).toBe(signatureMock.contractSignatureTestData.data[0].client);
        expect(contractSignaturePayLoad.vendor).toBe(signatureMock.contractSignatureTestData.data[0].vendor);
        expect(contractSignaturePayLoad.declinedReasons).toBe(signatureMock.contractSignatureTestData.data[0].declinedReasons);
        expect(contractSignaturePayLoad.personalGuarantee).toBe(signatureMock.contractSignatureTestData.data[0].personalGuaranteeData);
        expect(contractSignaturePayLoad.signer).toBe(signatureMock.contractSignatureTestData.data[0].signer);
    });

});
