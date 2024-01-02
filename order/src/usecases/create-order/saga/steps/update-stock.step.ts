import { Order } from 'src/entities/order';
import { Step } from './step';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import config from 'src/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UpdateStockStep extends Step<Order, void> {
  constructor(
    @Inject(config().services.inventory.name)
    private inventoryClient: ClientKafka,
  ) {
    super();
    this.name = 'Update Stock Step';
  }

  async invoke(order: Order): Promise<void> {
    const stockUpdate = await lastValueFrom(
      this.inventoryClient.send('inventory.stock.reduce', {
        products: order.orderItems.map((item) => ({
          id: item.productId,
          quantity: item.quantity,
        })),
      }),
    );
    if (!stockUpdate.success) {
      throw new Error("Couldn't update stock");
    }
  }

  async withCompenstation(order: Order): Promise<void> {
    const stockUpdate = await lastValueFrom(
      this.inventoryClient.send('inventory.stock.restock', {
        products: order.orderItems.map((item) => ({
          id: item.productId,
          quantity: item.quantity,
        })),
      }),
    );
    if (!stockUpdate.success) {
      throw new Error("Couldn't update stock");
    }
  }

  async onModuleInit() {
    this.inventoryClient.subscribeToResponseOf('inventory.stock.reduce');
    this.inventoryClient.subscribeToResponseOf('inventory.stock.restock');
    await this.inventoryClient.connect();
  }
}
