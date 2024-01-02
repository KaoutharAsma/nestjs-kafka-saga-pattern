import { randomUUID } from 'crypto';
import { OrderStatus } from './order-status';
import { OrderItem } from './order-item';

type OrderProps = {
  customerId: string;
  orderDate?: string;
  status?: OrderStatus;
  orderItems: OrderItem[];
};

export class Order {
  private _id: string;

  constructor(private props: OrderProps) {
    this._id = randomUUID();
    this.props.orderDate = new Date().toUTCString();
    this.props.status = OrderStatus.PENDING;
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this.props.customerId;
  }

  get orderDate(): string | undefined {
    return this.props.orderDate;
  }

  get status(): OrderStatus | undefined {
    return this.props.status;
  }

  get orderItems(): OrderItem[] {
    return this.props.orderItems;
  }

  confirm() {
    this.props.status = OrderStatus.CONFIRMED;
  }

  cancel() {
    this.props.status = OrderStatus.CANCELED;
  }
}
