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

    const payment = new Payment({ ...request })
    payment.authroize()
    this.paymentRepository.save(payment);
    return { authorized: true };
  }

  refund(request: { orderId: string; amount: number }): void {
    // call third party payment provider

    const payment = this.paymentRepository.findByOrderId(request.orderId);
    if (!payment) return;
    payment.cancel()
    this.paymentRepository.update(payment)
  }
}
