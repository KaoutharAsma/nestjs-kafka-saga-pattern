import { Inject } from '@nestjs/common';
import { ProductServiceInterface } from './product.service.interface';
import { ProductRepositoryInterface } from 'src/repositories/product.repository.interface';
import { Product } from 'src/entities/product';

export class ProductService implements ProductServiceInterface {
  constructor(
    @Inject('product-repository')
    private productRepository: ProductRepositoryInterface,
  ) {}

  fetchAvailibleProducts(request: { [id: string]: number }): Product[] {
    const products = this.productRepository.findMany(Object.keys(request));
    if (
      products.every((product) =>
        product.isStockSufficient(request[product.id]),
      )
    ) {
      console.log(products);
      return products;
    }

    return [];
  }

  updateStock(request: { [id: string]: number }): void {
    const products = this.productRepository.findMany(Object.keys(request));
    this.productRepository.updateMany(products);
  }
}
