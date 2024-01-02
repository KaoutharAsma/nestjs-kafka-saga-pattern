import { Product } from 'src/entities/product';
import { ProductRepositoryInterface } from '../product.repository.interface';

export class ProductRepository implements ProductRepositoryInterface {
  private products: Product[] = [
    new Product(
      {
        name: 'Laptop',
        price: 999.99,
        quantity: 1,
      },
      'P001',
    ),
    new Product(
      {
        name: 'Smartphone',
        price: 599.99,
        quantity: 100,
      },
      'P002',
    ),
    new Product(
      {
        name: 'Wireless Headphones',
        price: 89.99,
        quantity: 75,
      },
      'P003',
    ),
    new Product(
      {
        name: 'Smartwatch',
        price: 129.99,
        quantity: 30,
      },
      'P004',
    ),
    new Product(
      {
        name: '4K Smart TV',
        price: 799.99,
        quantity: 20,
      },
      'P005',
    ),
    new Product(
      {
        name: 'Gaming Console',
        price: 299.99,
        quantity: 40,
      },
      'P006',
    ),
    new Product(
      {
        name: 'Coffee Maker',
        price: 49.99,
        quantity: 60,
      },
      'P007',
    ),
    new Product(
      {
        name: 'Bluetooth Speaker',
        price: 69.99,
        quantity: 80,
      },
      'P008',
    ),
    new Product(
      {
        name: 'Digital Camera',
        price: 449.99,
        quantity: 25,
      },
      'P009',
    ),
    new Product(
      {
        name: 'Fitness Tracker',
        price: 79.99,
        quantity: 55,
      },
      'P010',
    ),
  ];

  update(product: Product): void {
    const index = this.products.findIndex((p) => p.id === product.id);
    if (index < 0) throw new Error('Product Not found');
    this.products[index] = product;
  }

  findMany(ids: string[]): Product[] {
    return ids.reduce((found, id) => {
      const product = this.products.find((p) => p.id === id);
      if (product) found.push(product);
      return found;
    }, [] as Product[]);
  }

  updateMany(products: Partial<Product>[]): void {
    products.forEach((update) => {
      const product = this.products.find((p) => p.id === update.id);
      if (product) Object.assign(product, update);
    });
  }
}
