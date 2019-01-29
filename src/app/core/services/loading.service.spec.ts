import { TestBed, inject } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService]
    });
  });

  it('should be created', inject([LoadingService], (service: LoadingService) => {
    expect(service).toBeTruthy();
  }));

  it('should have a total of 0', inject([LoadingService], (service: LoadingService) => {
    expect(service.total).toBe(0);
  }));

  it('should increment a value', inject([LoadingService], (service: LoadingService) => {
    service.increment(3);
    expect(service.total).toBe(3);
  }));

  it('should return the value 0', inject([LoadingService], (service: LoadingService) => {
    service.getValue().subscribe(value => {
      expect(value).toBe(0);
    });
  }));

  it('should return the value 33 after incrementing 33', inject([LoadingService], (service: LoadingService) => {
    service.increment(33);
    service.getValue().subscribe(value => {
      expect(value).toBe(33);
    });
  }));

  it('should clear the value', inject([LoadingService], (service: LoadingService) => {
    service.increment(1);
    service.clear();
    expect(service.total).toBe(0);
  }));
});
