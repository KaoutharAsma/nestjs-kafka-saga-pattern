import { Order } from 'src/entities/order';
import { OrderRepositoryInterface } from '../order.repository.interface';

export class OrderRepository implements OrderRepositoryInterface {
  private orders: Order[] = [];

  save(order: Order): void {
    this.orders.push(order);
  }

  update(order: Order): void {
    const index = this.orders.findIndex((p) => p.id === order.id);
    if (index < 0) throw new Error('Order Not found');
    this.orders[index] = order;
  }
}
