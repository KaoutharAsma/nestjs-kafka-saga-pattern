import { Order } from 'src/entities/order';
import { OrderRepositoryInterface } from '../order.repository.interface';

export class OrderRepository implements OrderRepositoryInterface {
  private orders: Order[] = [];

  save(order: Order): void {
    this.orders.push(order);
  }

  update(order: Order): void {
    throw new Error('Method not implemented.');
  }
}
