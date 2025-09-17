import { IsString, IsNumber, IsOptional, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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