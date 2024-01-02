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
export class FetchAvailibleProductsController {
  constructor(
    @Inject('product-service')
    private readonly service: ProductServiceInterface,
  ) {}

  @MessagePattern('inventory.products.get')
  fetchAvailibleProducts(@Payload() message: CheckProductsAvailibilityMessage) {
    console.log('fetch');
    return this.service.fetchAvailibleProducts(
      message.products.reduce(
        (result, { id, quantity }) => ({ ...result, [id]: quantity }),
        {},
      ),
    );
  }
}
