import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../usecases/create-order/dtos/create-order-dto';
import { OrderRepositoryInterface } from 'src/repositories/order.repository.interface';
import { Order } from 'src/entities/order';
import { OrderItem } from 'src/entities/order-item';
import config from 'src/config';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { OutOfStockError } from 'src/exceptions/out_of_stock_error';
import { PaymentNotSuccessfulError } from 'src/exceptions/payment_not_successful';
import { OrderServiceInterface } from './order.service.interface';

@Injectable()
export class OrderService implements OrderServiceInterface {
  constructor(
    @Inject('order-repository')
    private orderRepository: OrderRepositoryInterface,
    @Inject(config().services.inventory.name)
    private inventoryClient: ClientKafka,
    @Inject(config().services.payment.name) private paymentClient: ClientKafka,
  ) {}

  async createOrder(body: CreateOrderDto): Promise<Order> {
    const order = new Order({
      customerId: body.customerId,
      orderItems: body.orderItems.map((orderItem) => new OrderItem(orderItem)),
    });

    this.orderRepository.save(order);

    const availbleProducts = await lastValueFrom(
      this.inventoryClient.send('inventory.products.get', {
        products: body.orderItems.map((item) => ({
          id: item.productId,
          quantity: item.quantity,
        })),
      }),
    );

    if (availbleProducts.length <= 0) {
      throw new OutOfStockError();
    }

    const paymnetAuthorization = await lastValueFrom(
      this.paymentClient.send('payment.payment.authorize', {
        orderId: order.id,
        amount: availbleProducts.reduce(
          (accumulator: number, product: { amount: number }) => {
            return accumulator + product.amount;
          },
          0,
        ),
      }),
    );

    if (!paymnetAuthorization.authorized) {
      throw new PaymentNotSuccessfulError();
    }

    order.confirm();

    this.orderRepository.update(order);

    const stockUpdate = await lastValueFrom(
      this.inventoryClient.send('inventory.stock.update', {
        products: body.orderItems.map((item) => ({
          id: item.productId,
          quantity: item.quantity,
        })),
      }),
    );
    if (stockUpdate.success) {
      throw new Error();
    }
    return order;
  }

  async onModuleInit() {
    this.inventoryClient.subscribeToResponseOf('inventory.products.get');
    this.inventoryClient.subscribeToResponseOf('inventory.stock.update');
    this.paymentClient.subscribeToResponseOf('payment.payment.authorize');

    await this.inventoryClient.connect();
    await this.paymentClient.connect();
  }
}
