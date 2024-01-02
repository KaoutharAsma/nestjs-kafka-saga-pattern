import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, Inject } from '@nestjs/common';
import { ProductServiceInterface } from 'src/services/product.service.interface';

type UpdateStockMessage = {
  products: [
    {
      id: string;
      quantity: number;
    },
  ];
};

@Controller()
export class UpdateStockController {
  constructor(
    @Inject('product-service')
    private readonly service: ProductServiceInterface,
  ) {}

  @MessagePattern('inventory.stock.reduce')
  reduceStockQuantity(@Payload() message: UpdateStockMessage) {
    console.info('Inventory Service: reduce stock quantity');

    this.service.reduceStockQuantity(
      message.products.reduce(
        (result, { id, quantity }) => ({ ...result, [id]: quantity }),
        {},
      ),
    );
    return {
      success: true,
    };
  }

  @MessagePattern('inventory.stock.restock')
  restockQuantity(@Payload() message: UpdateStockMessage) {
    console.info('Inventory Service: restock quantity');

    this.service.restockQuantity(
      message.products.reduce(
        (result, { id, quantity }) => ({ ...result, [id]: quantity }),
        {},
      ),
    );

    return {
      success: true,
    };
  }
}
