import { IsString, IsNumber, IsOptional, IsNotEmpty, Min, ValidateNested, IsArray,} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ description: 'Product code' })
  @IsString()
  @IsNotEmpty()
  productCode!: string;

  @ApiProperty({ description: 'Product name' })
  @IsString()
  @IsNotEmpty()
  productName!: string;

  @ApiProperty({ description: 'Product description' })
  @IsString()
  @IsNotEmpty()
  productDescription!: string;

  @ApiProperty({ description: 'Product rate' })
  @IsNumber()
  @Min(0)
  productRate!: number;

  @ApiProperty({ description: 'Product image URL', required: false })
  @IsString()
  @IsOptional()
  productImage?: string;
}

export class UpdateProductDto {
  @ApiProperty({ description: 'Product code', required: false })
  @IsString()
  @IsOptional()
  productCode?: string;

  @ApiProperty({ description: 'Product name', required: false })
  @IsString()
  @IsOptional()
  productName?: string;

  @ApiProperty({ description: 'Product description', required: false })
  @IsString()
  @IsOptional()
  productDescription?: string;

  @ApiProperty({ description: 'Product rate', required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  productRate?: number;

  @ApiProperty({ description: 'Product image URL', required: false })
  @IsString()
  @IsOptional()
  productImage?: string;
}

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