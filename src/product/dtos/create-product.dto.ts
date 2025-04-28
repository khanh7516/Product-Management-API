import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductStatus } from '../product.entity';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsEnum(ProductStatus)
  status: ProductStatus;

  @IsDateString()
  releaseDate: string;
}
