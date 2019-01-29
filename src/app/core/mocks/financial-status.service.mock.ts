import { Observable, of } from 'rxjs';
import { LatePayment } from '../../shared/models/latePayment';
import { Invoice } from '../../shared/models/invoice';

export class FinancialServiceMock {

  latePayment: LatePayment[];
  mockInvoicesArray: Invoice[] = [
    {
      id: '14551ASD',
      applicationNumber: 'AP-015839',
      period: '1523750400000',
      createdDate: '1523750400000',
      dueDate: '1523750400000',
      total: '33532',
      status: 'Pago',
      objectName: 'Fatura',
      paymentMethod: 'Ref. Multibanco',
    },
    {
      id: '14551ASD',
      applicationNumber: 'AP-015839',
      period: '1523750400000',
      createdDate: '1523750400000',
      dueDate: '1523750400000',
      total: '33532',
      status: 'Pago',
      objectName: 'Fatura',
      paymentMethod: 'Ref. Multibanco',
    },
    {
      id: '14551ASD',
      applicationNumber: 'AP-015839',
      period: '1523750400000',
      createdDate: '1523750400000',
      dueDate: '1523750400000',
      total: '33532',
      status: 'A aguardar pagamento',
      objectName: 'Fatura',
      paymentMethod: 'Débito Direto',
    },
  ];

  constructor(
  ) { }

  getLatePayment(): Observable<LatePayment[]> {
    this.latePayment = [];
    this.latePayment [0] = new LatePayment(1313.14, '11683',
        '000000000', '2018-01-09T15:31:05.000Z', 'AP-040267');
    this.latePayment [1] = new LatePayment(1313.14, '11683',
        '000000000', '2018-01-09T15:31:05.000Z', 'AP-040267');
    this.latePayment [2] = new LatePayment(1313.14, '11683',
        '000000000', '2018-01-09T15:31:05.000Z', 'AP-040267');
    return of(this.latePayment);
  }

  getNextInvoices(): Observable<Invoice[]> {
    return of(this.mockInvoicesArray);
  }
}


