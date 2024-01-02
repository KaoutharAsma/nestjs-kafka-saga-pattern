import { Inject, Injectable } from '@nestjs/common';
import { Step } from './step';
import config from 'src/config';
import { ClientKafka } from '@nestjs/microservices';
import { PaymentNotSuccessfulError } from 'src/exceptions/payment_not_successful';
import { lastValueFrom } from 'rxjs';
import { Order } from 'src/entities/order';

@Injectable()
export class AuthorizePaymentStep extends Step<Order, void> {
  constructor(
    @Inject(config().services.payment.name) private paymentClient: ClientKafka,
  ) {
    super();
    this.name = 'Authorize Payment Step';
  }

  async invoke(order: Order): Promise<any> {
    const paymnetAuthorization = await lastValueFrom(
      this.paymentClient.send('payment.payment.authorize', {
        orderId: order.id,
        amount: order.orderItems.reduce((accumulator: number, item) => {
          return accumulator + item.totalPrice;
        }, 0),
      }),
    );

    if (!paymnetAuthorization.authorized) {
      throw new PaymentNotSuccessfulError('The payment unsuccessful');
    }
  }

  async withCompenstation(order: Order): Promise<any> {
    await lastValueFrom(
      this.paymentClient.send('payment.payment.refund', {
        orderId: order.id,
        amount: order.orderItems.reduce((accumulator: number, item) => {
          return accumulator + item.totalPrice;
        }, 0),
      }),
    );
  }

  async onModuleInit() {
    this.paymentClient.subscribeToResponseOf('payment.payment.authorize');
    this.paymentClient.subscribeToResponseOf('payment.payment.refund');

    await this.paymentClient.connect();
  }
}
