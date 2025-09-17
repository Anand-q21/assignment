import { Controller, Post, Get, Param, Body, UseGuards, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateOrderDto } from '@shared/dtos';

@ApiTags('orders')
@Controller('orders')
export class OrdersGatewayController {
  constructor(@Inject('ORDERS_SERVICE') private readonly ordersClient: ClientProxy) {}

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.ordersClient.send({ cmd: 'create_order' }, dto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.ordersClient.send({ cmd: 'get_orders' }, {});
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ordersClient.send({ cmd: 'get_order' }, +id);
  }
}