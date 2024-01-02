import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import config from './config';
import { AuthorizePaymentController } from './usecases/authorize-payment/authorize-payment.controller';
import { PaymentRepository } from './repositories/memory/payment.repository';
import { PaymentService } from './services/payment.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [config] })],
  controllers: [AuthorizePaymentController],
  providers: [
    {
      provide: 'payment-repository',
      useClass: PaymentRepository,
    },
    {
      provide: 'payment-service',
      useClass: PaymentService,
    },
  ],
})
export class AppModule {}
