import { Module } from '@nestjs/common';
import config from './config';
import { ConfigModule } from '@nestjs/config';
import { ProductRepository } from './repositories/memory/product.repository';
import { CheckProductAvailibityController } from './usecases/fetch-availible-products/check-products-availiblity.controller';
import { UpdateStockController } from './usecases/update-stock/update-stock.controller';
import { ProductService } from './services/product.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [config] })],
  controllers: [CheckProductAvailibityController, UpdateStockController],
  providers: [
    {
      provide: 'product-repository',
      useClass: ProductRepository,
    },
    {
      provide: 'product-service',
      useClass: ProductService,
    },
  ],
})
export class AppModule {}
