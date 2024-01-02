import { Order } from 'src/entities/order';
import { Step } from './step';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import config from 'src/config';
import { OutOfStockError } from 'src/exceptions/out_of_stock_error';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CheckProductsAvailibityStep extends Step<Order, void> {
  constructor(
    @Inject(config().services.inventory.name)
    private inventoryClient: ClientKafka,
  ) {
    super();
    this.name = 'Check Products Availbility Step';
  }

  async invoke(order: Order): Promise<void> {
    const availbleProducts = await lastValueFrom(
      this.inventoryClient.send('inventory.products.get', {
        products: order.orderItems.map((item) => ({
          id: item.productId,
          quantity: item.quantity,
        })),
      }),
    );

    if (!availbleProducts.availible) {
      throw new OutOfStockError(
        `${order.orderItems.map((item) => item.productId)} is not availbe`,
      );
    }
  }

  withCompenstation(params: Order): Promise<any> {
    return Promise.resolve();
  }

  async onModuleInit() {
    this.inventoryClient.subscribeToResponseOf('inventory.products.get');
    await this.inventoryClient.connect();
  }
}
