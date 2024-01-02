import { Product } from 'src/entities/product';

export interface ProductServiceInterface {
  fetchAvailibleProducts(request: { [id: string]: number }): Product[];
  updateStock(request: { [id: string]: number }): void;
}
