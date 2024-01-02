import { Payment } from 'src/entities/payment';
import { PaymentRepositoryInterface } from '../payment.repository.interface';

export class PaymentRepository implements PaymentRepositoryInterface {
  private payments: Payment[] = [];

  save(payment: Payment): void {
    this.payments.push(payment);
  }

  update(payment: Payment): void {
    const index = this.payments.findIndex((p) => p.id === payment.id);
    if (index < 0) throw new Error('Payment Not found');
    this.payments[index] = payment;
  }

  findByOrderId(orderId: string): Payment | undefined {
    return this.payments.find((p) => p.orderId === orderId);
  }
}
