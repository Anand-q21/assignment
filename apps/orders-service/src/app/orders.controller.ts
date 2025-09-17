import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from '@shared/dtos';

@Controller()
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @MessagePattern({ cmd: 'create_order' })
  create(dto: CreateOrderDto) {
    return this.service.create(dto);
  }

  @MessagePattern({ cmd: 'get_orders' })
  findAll() {
    return this.service.findAll();
  }

  @MessagePattern({ cmd: 'get_order' })
  findOne(id: number) {
    return this.service.findOne(id);
  }
}