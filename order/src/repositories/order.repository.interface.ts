import { Order } from 'src/entities/order';

export interface OrderRepositoryInterface {
  save(order: Order): void;
  update(order: Order): void;
}
