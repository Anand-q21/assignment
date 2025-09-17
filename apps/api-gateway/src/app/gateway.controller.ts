import { Controller, Get, Post, Body, Param, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '@shared/dtos';

@ApiTags('products')
@Controller('products')
export class GatewayProductsController {
  constructor(
    @Inject('PRODUCTS_SERVICE') private readonly productsClient: ClientProxy,
  ) {}

  @ApiBearerAuth('access-token') 
  @UseGuards(JwtAuthGuard)
  @Get()
  getProducts() {
    return this.productsClient.send({ cmd: 'get_products' }, {});
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'get_product' }, { id: +id });
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post()
  createProduct(@Body() body: CreateProductDto) {
    return this.productsClient.send({ cmd: 'create_product' }, body);
  }
}