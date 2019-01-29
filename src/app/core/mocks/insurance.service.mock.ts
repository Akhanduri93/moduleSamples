import { Insurance } from '../../shared/models/insurance';
import { Observable, of } from 'rxjs';

export class InsuranceMockService {
  insurances: Insurance[] = [
    {
      id: 'a4o240000004LENAA2',
      description: 'Lorem ipsum is simply a dummy text.',
      amount: '32,39',
      active: true
    },
    {
      id: 'a4o240000004LENAA2',
      description: 'Lorem ipsum is simply a dummy text.',
      amount: '35,39',
      active: false
    }];

  getInsurances(id): Observable<Insurance[]> {
    return of(this.insurances);
  }
}
