import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';

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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
