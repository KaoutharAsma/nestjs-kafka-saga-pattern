import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, Inject } from '@nestjs/common';
import { ProductServiceInterface } from 'src/services/product.service.interface';

type CheckProductsAvailibilityMessage = {
  products: [
    {
      id: string;
      quantity: number;
    },
  ];
};

@Controller()
export class CheckProductAvailibityController {
  constructor(
    @Inject('product-service')
    private readonly service: ProductServiceInterface,
  ) {}

  @MessagePattern('inventory.products.get')
  checkProductAvailibity(@Payload() message: CheckProductsAvailibilityMessage) {
    return {
      availible: this.service.checkProductAvailibity(
        message.products.reduce(
          (result, { id, quantity }) => ({ ...result, [id]: quantity }),
          {},
        ),
      ),
    };
  }
}
