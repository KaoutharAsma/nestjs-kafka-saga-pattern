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

  @MessagePattern('inventory.stock.update')
  UpdateStock(@Payload() message: UpdateStockMessage) {
    this.service.updateStock(
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
