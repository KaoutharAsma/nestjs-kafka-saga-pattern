import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../usecases/create-order/dtos/create-order-dto';
import { Order } from 'src/entities/order';
import { OrderItem } from 'src/entities/order-item';
import { OrderServiceInterface } from './order.service.interface';
import { CreateOrderSaga } from 'src/usecases/create-order/saga/create-order.saga';

@Injectable()
export class OrderService implements OrderServiceInterface {
  constructor(@Inject('create-order-saga') private saga: CreateOrderSaga) {}

  async createOrder(body: CreateOrderDto): Promise<void> {
    const order = new Order({
      customerId: body.customerId,
      orderItems: body.orderItems.map((orderItem) => new OrderItem(orderItem)),
    });
    await this.saga.execute(order);
  }
}
