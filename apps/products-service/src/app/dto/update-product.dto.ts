import { IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  productCode?: string;  // ✅ add this

  @IsString()
  @IsOptional()
  productName?: string;

  @IsString()
  @IsOptional()
  productDescription?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  productRate?: number;

  @IsString()
  @IsOptional()
  productImage?: string;
}