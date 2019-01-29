import { Equipment } from '../../shared/models/equipment';
import { Observable, of } from 'rxjs';

export class MockEquipmentService {

  quantity: number;
  name: string;
  description: string;
  serialNumbers: string[];

  equipments: Equipment[] = [
    {
      description: 'Description data.',
      quantity: 2,
      serialNumbers: ['1238 438239484']
    },
    {
      description: 'Description data.',
      quantity: 2,
      serialNumbers: ['1238 438239484']
    },
    {
      description: 'Description data.',
      quantity: 2,
      serialNumbers: ['1238 438239484']
    },
    {
      description: 'Description data.',
      quantity: 2,
      serialNumbers: ['1238 438239484']
    },
    {
      description: 'Description data.',
      quantity: 2,
      serialNumbers: ['1238 438239484']
    }
  ];

  equipment: Equipment =
    {
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      quantity: 2,
      serialNumbers: ['1238 438239484']
    };


  getEquipments(id): Observable<Equipment[]> {
    if (this.equipments) {
      return of(this.equipments);
    }
  }


}
