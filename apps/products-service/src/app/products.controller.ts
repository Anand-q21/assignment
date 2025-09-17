import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from '@shared/dtos';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'create_product' })
  createProduct(data: CreateProductDto) {
    return this.productsService.create(data);
  }

  @MessagePattern({ cmd: 'get_products' })
  findAll() {
    return this.productsService.findAll();
  }

  @MessagePattern({ cmd: 'get_product' })
  findOne(id: number) {
    return this.productsService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_product' })
  update(payload: { id: number; dto: UpdateProductDto }) {
    return this.productsService.update(payload.id, payload.dto);
  }

  @MessagePattern({ cmd: 'delete_product' })
  remove(id: number) {
    return this.productsService.remove(id);
  }
}