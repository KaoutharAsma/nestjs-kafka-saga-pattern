import { Payment } from 'src/entities/payment';
import { PaymentRepositoryInterface } from '../payment.repository.interface';

export class PaymentRepository implements PaymentRepositoryInterface {
  private payments: Payment[] = [];

  save(payment: Payment): void {
    this.payments.push(payment);
  }
}
