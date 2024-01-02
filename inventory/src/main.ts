import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: config().services.inventory.clientId,
        brokers: [config().broker],
      },
      consumer: {
        groupId: config().services.inventory.groupId,
      },
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
