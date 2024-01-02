import { Inject, Injectable } from '@nestjs/common';
import { PlaceOrderStep } from './steps/place-order.step';
import { AuthorizePaymentStep } from './steps/authorize-payment.step';
import { ConfirmOrderStep } from './steps/confirm-order.step';
import { UpdateStockStep } from './steps/update-stock.step';
import { Step } from './steps/step';
import { Order } from 'src/entities/order';
import { CheckProductsAvailibityStep } from './steps/check-product-availibilty.step';

@Injectable()
export class CreateOrderSaga {
  private steps: Step<Order, void>[] = [];
  private successfulSteps: Step<Order, void>[] = [];

  constructor(
    @Inject('place-order-step') step1: PlaceOrderStep,
    @Inject('check-products-availibity') step2: CheckProductsAvailibityStep,
    @Inject('authorize-payment') step3: AuthorizePaymentStep,
    @Inject('confirm-order') step4: ConfirmOrderStep,
    @Inject('update-stock') step5: UpdateStockStep,
  ) {
    this.steps = [step1, step2, step3, step4, step5];
  }

  async execute(order: Order) {
    for (let step of this.steps) {
      try {
        console.info(`Invoking: ${step.name} ...`);
        await step.invoke(order);
        this.successfulSteps.unshift(step);
      } catch (error) {
        console.error(`Failed Step: ${step.name} !!`);
        this.successfulSteps.forEach(async (s) => {
          console.info(`Rollbacking: ${s.name} ...`);
          await s.withCompenstation(order);
        });
        throw error;
      }
    }
    console.info('Order Creation Transaction ended successfuly');
  }
}
