import { IsString, IsNumber, IsNotEmpty, Min, ValidateNested, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CustomerDetailsDto {
  @ApiProperty({ description: 'Customer name' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ description: 'Customer phone' })
  @IsString()
  @IsNotEmpty()
  phone!: string;
}

export class OrderProductDto {
  @ApiProperty({ description: 'Product ID' })
  @IsNumber()
  productId!: number;

  @ApiProperty({ description: 'Quantity' })
  @IsNumber()
  @Min(1)
  quantity!: number;

  @ApiProperty({ description: 'Unit price' })
  @IsNumber()
  @Min(0)
  unitPrice!: number;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'Customer details' })
  @ValidateNested()
  @Type(() => CustomerDetailsDto)
  customerDetails!: CustomerDetailsDto;

  @ApiProperty({ description: 'Order products', type: [OrderProductDto] })
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  @IsArray()
  products!: OrderProductDto[];

  @ApiProperty({ description: 'Total amount' })
  @IsNumber()
  @Min(0)
  totalAmount!: number;
}