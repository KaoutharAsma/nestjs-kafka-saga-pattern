import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentServiceInterface } from 'src/services/payment.service.interface';

type AuthorizePaymentMessage = {
  orderId: string;
  amount: number;
};
@Controller()
export class AuthorizePaymentController {
  constructor(
    @Inject('payment-service') private paymentService: PaymentServiceInterface,
  ) {}

  @MessagePattern('payment.payment.authorize')
  authorizePayment(@Payload() message: AuthorizePaymentMessage) {
    console.info('Payment Service: authorize payment');

    return this.paymentService.authorizePayment(message);
  }

  @MessagePattern('payment.payment.refund')
  refund(@Payload() message: AuthorizePaymentMessage) {
    console.info('Payment Service: refund payment');

    return this.paymentService.refund(message);
  }
}
