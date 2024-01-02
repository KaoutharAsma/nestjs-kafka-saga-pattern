import { randomUUID } from 'crypto';

type PaymentProps = {
  orderId: string;
  amount: number;
  paymentDate?: string;
};

export class Payment {
  private _id: string;

  constructor(private props: PaymentProps) {
    this._id = randomUUID();
    this.props.paymentDate = new Date().toUTCString();
  }

  get id(): string {
    return this._id;
  }

  get amount(): number {
    return this.props.amount;
  }

  get paymentDate(): string | undefined {
    return this.props.paymentDate;
  }
}
