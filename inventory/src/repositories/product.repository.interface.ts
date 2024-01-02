import { Product } from 'src/entities/product';

export interface ProductRepositoryInterface {
  update(product: Product): void;
  findMany(ids: string[]): Product[];
  updateMany(products: Partial<Product>[]): void;
}
