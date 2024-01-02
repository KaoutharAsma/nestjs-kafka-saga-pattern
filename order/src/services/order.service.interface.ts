import { Order } from 'src/entities/order';
import { CreateOrderDto } from 'src/usecases/create-order/dtos/create-order-dto';

export interface OrderServiceInterface {
  createOrder(body: CreateOrderDto): Promise<void>;
}
