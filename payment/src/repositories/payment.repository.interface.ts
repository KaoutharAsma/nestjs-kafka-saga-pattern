import { Payment } from 'src/entities/payment';

export interface PaymentRepositoryInterface {
  save(payment: Payment): void;
}
