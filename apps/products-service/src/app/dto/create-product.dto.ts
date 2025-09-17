import { IsString, IsNotEmpty, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  productCode!: string;

  @IsString()
  @IsNotEmpty()
  productName!: string;

  @IsString()
  @IsNotEmpty()
  productDescription!: string;

  @IsNumber()
  @Min(0)
  productRate!: number;

  @IsString()
  @IsOptional()
  productImage?: string;
}