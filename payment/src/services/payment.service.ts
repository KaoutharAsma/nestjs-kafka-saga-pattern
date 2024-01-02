import { Inject } from '@nestjs/common';
import { PaymentServiceInterface } from './payment.service.interface';
import { PaymentRepositoryInterface } from 'src/repositories/payment.repository.interface';
import { Payment } from 'src/entities/payment';

export class PaymentService implements PaymentServiceInterface {
  constructor(
    @Inject('payment-repository')
    private paymentRepository: PaymentRepositoryInterface,
  ) {}
  authorizePayment(request: { orderId: string; amount: number }): {
    authorized: boolean;
  } {
    // call third party payment provider

    this.paymentRepository.save(new Payment({ ...request }));
    return { authorized: true };
  }
}
