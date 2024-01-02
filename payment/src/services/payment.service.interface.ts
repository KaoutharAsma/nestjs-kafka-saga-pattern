export interface PaymentServiceInterface {
  authorizePayment(request: { orderId: string; amount: number }): {
    authorized: boolean;
  };
  refund(request: { orderId: string; amount: number }): void;
}
