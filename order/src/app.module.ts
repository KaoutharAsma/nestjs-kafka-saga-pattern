import { OrderRepository } from './repositories/memory/order.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import config from './config';
import { CreateOrderController } from './usecases/create-order/create-order.controller';
import { OrderService } from './services/order.service';
import { CreateOrderSaga } from './usecases/create-order/saga/create-order.saga';
import { PlaceOrderStep } from './usecases/create-order/saga/steps/place-order.step';
import { CheckProductsAvailibityStep } from './usecases/create-order/saga/steps/check-product-availibilty.step';
import { AuthorizePaymentStep } from './usecases/create-order/saga/steps/authorize-payment.step';
import { ConfirmOrderStep } from './usecases/create-order/saga/steps/confirm-order.step';
import { UpdateStockStep } from './usecases/create-order/saga/steps/update-stock.step';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: config().services.inventory.name,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: config().services.order.clientId,
            brokers: [config().broker],
          },
          consumer: {
            groupId: config().services.inventory.groupId,
          },
        },
      },
      {
        name: config().services.payment.name,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: config().services.order.clientId,
            brokers: [config().broker],
          },
          consumer: {
            groupId: config().services.payment.groupId,
          },
        },
      },
    ]),
  ],
  controllers: [CreateOrderController],
  providers: [
    {
      provide: 'order-repository',
      useClass: OrderRepository,
    },
    {
      provide: 'place-order-step',
      useClass: PlaceOrderStep,
    },
    {
      provide: 'check-products-availibity',
      useClass: CheckProductsAvailibityStep,
    },
    {
      provide: 'authorize-payment',
      useClass: AuthorizePaymentStep,
    },
    {
      provide: 'confirm-order',
      useClass: ConfirmOrderStep,
    },
    {
      provide: 'update-stock',
      useClass: UpdateStockStep,
    },
    {
      provide: 'create-order-saga',
      useClass: CreateOrderSaga,
    },
    {
      provide: 'order-service',
      useClass: OrderService,
    },
  ],
})
export class AppModule {}
