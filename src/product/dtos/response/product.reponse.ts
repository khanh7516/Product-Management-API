
import { Expose } from 'class-transformer';
import { ProductStatus } from 'src/product/product.entity';

export class ProductResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Expose()
  imageUrl: string;

  @Expose()
  status: ProductStatus;

  @Expose()
  releaseDate: string;

  constructor(partial: Partial<ProductResponseDto>) {
    Object.assign(this, partial);
  }
}
