import { IsString, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateProductDto {
  @IsString()
  code!: string;

  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsNumber()
  rate!: number;

  @IsString()
  image!: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}