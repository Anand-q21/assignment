import { IsString, IsNumber } from 'class-validator';

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