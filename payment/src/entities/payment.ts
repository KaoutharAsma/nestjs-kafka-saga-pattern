import { randomUUID } from 'crypto';
import { PaymentStatus } from './payment-status';

type PaymentProps = {
  orderId: string;
  amount: number;
  paymentDate?: string;
  status?: PaymentStatus;
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

  get orderId(): string {
    return this.props.orderId;
  }

  get paymentDate(): string | undefined {
    return this.props.paymentDate;
  }

  authroize() {
    this.props.status = PaymentStatus.AUTHORIZED;
  }
  cancel() {
    this.props.status = PaymentStatus.CANCELED;
  }
}
