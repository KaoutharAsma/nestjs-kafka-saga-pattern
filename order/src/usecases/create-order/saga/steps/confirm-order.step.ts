import { Inject, Injectable } from '@nestjs/common';
import { Step } from './step';
import { OrderRepositoryInterface } from 'src/repositories/order.repository.interface';
import { Order } from 'src/entities/order';

@Injectable()
export class ConfirmOrderStep extends Step<Order, void> {
  constructor(
    @Inject('order-repository')
    private orderRepository: OrderRepositoryInterface,
  ) {
    super();
    this.name = 'Confirm Order Step';
  }

  invoke(order: Order): Promise<void> {
    order.confirm();
    this.orderRepository.update(order);
    return Promise.resolve();
  }

  withCompenstation(order: Order): Promise<void> {
    order.cancel();
    this.orderRepository.update(order);
    return Promise.resolve();
  }
}
