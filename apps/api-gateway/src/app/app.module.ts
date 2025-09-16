import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsGatewayController } from './products.controller';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCTS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.PRODUCTS_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.PRODUCTS_SERVICE_PORT || '3001'),
        },
      },
    ]),
  ],
  controllers: [AppController, ProductsGatewayController],
  providers: [AppService],
})
export class AppModule {}