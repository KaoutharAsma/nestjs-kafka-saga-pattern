import { OrderRepository } from './repositories/memory/order.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import config from './config';
import { CreateOrderController } from './usecases/create-order/create-order.controller';
import { OrderService } from './services/order.service';

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
      provide: 'order-service',
      useClass: OrderService,
    },
  ],
})
export class AppModule {}
