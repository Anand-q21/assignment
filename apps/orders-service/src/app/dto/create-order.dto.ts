import { IsNotEmpty, IsString, IsArray, IsNumber, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CustomerDetailsDto {
  @IsString() @IsNotEmpty()
  name!: string;

  @IsString() @IsNotEmpty()
  phone!: string;
}

class OrderItemDto {
  @IsNumber() productId!: number;
  @IsNumber() @Min(1) quantity!: number;
  @IsNumber() @Min(0) unitPrice!: number;
}

export class CreateOrderDto {
  @ValidateNested() @Type(() => CustomerDetailsDto)
  customerDetails!: CustomerDetailsDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  products!: OrderItemDto[];

  @IsNumber() @Min(0)
  totalAmount!: number;
}