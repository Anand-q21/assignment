import { Controller, Get, Post, Param, Body, Put, Delete, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateProductDto, UpdateProductDto } from '@my-org/shared-dtos';


@Controller('products')
export class ProductsGatewayController {
  constructor(
    @Inject('PRODUCTS_SERVICE') private readonly productsClient: ClientProxy,
  ) {}

  // 🔹 CREATE
  @Post()
  async create(@Body() product:  CreateProductDto) {
    return firstValueFrom(
      this.productsClient.send({ cmd: 'create_product' }, product),
    );
  }

  // 🔹 FIND ALL
  @Get()
  async findAll() {
    return firstValueFrom(
      this.productsClient.send({ cmd: 'get_products' }, {}),
    );
  }

  // 🔹 FIND ONE
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return firstValueFrom(
      this.productsClient.send({ cmd: 'get_product' }, parseInt(id)),
    );
  }

  // 🔹 UPDATE
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto:UpdateProductDto) {
    return firstValueFrom(
      this.productsClient.send(
        { cmd: 'update_product' },
        { id: parseInt(id), dto },
      ),
    );
  }

  // 🔹 DELETE
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return firstValueFrom(
      this.productsClient.send({ cmd: 'delete_product' }, parseInt(id)),
    );
  }
}