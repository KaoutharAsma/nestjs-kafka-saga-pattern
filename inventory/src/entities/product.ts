import { randomUUID } from 'crypto';

type ProductProps = {
  name: string;
  price: number;
  quantity: number;
};

export class Product {
  private _id: string;

  constructor(
    private props: ProductProps,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get price(): number {
    return this.props.price;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  set quantity(quantity: number) {
    this.props.quantity = quantity;
  }

  isStockSufficient(demandedQuantity: number): boolean {
    return this.props.quantity >= demandedQuantity;
  }
}
