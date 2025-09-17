import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { ProductsGatewayController } from './products.controller';
import { OrdersGatewayController } from './orders.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'superSecretKey',
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    ClientsModule.register([
      {
        name: 'PRODUCTS_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3001 },
      },
      {
        name: 'ORDERS_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3002 }, 
      },
    ]),
  ],
  controllers: [ProductsGatewayController, OrdersGatewayController],
})
export class AppModule {}