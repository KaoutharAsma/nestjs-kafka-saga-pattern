import { randomUUID } from 'crypto';

type OrderItemProps = {
  productId: string;
  quantity: number;
  totalPrice?: number;
};

export class OrderItem {
  private _id: string;

  constructor(private props: OrderItemProps) {
    this._id = randomUUID();
  }

  get id() {
    return this._id;
  }

  get productId(): string {
    return this.props.productId;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get totalPrice(): number | undefined {
    return this.props.totalPrice;
  }
}
