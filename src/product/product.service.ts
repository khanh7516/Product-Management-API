import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from './product.entity';
import { DeleteFlag } from 'src/common/enums/delete-flag.enum';

@Injectable()
export class ProductService {
  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;

  /**
   *
   * @returns All products in the database.
   */
  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  /**
   * Find all active products (not soft-deleted).
   * @returns All active products.
   */
  async findAllActive(): Promise<Product[]> {
    return this.productRepository.find({
      where: { deleteFlag: DeleteFlag.ACTIVE },
    });
  }

  /**
   * Find a product by its ID.
   * @param id - The ID of the product to find.
   * @returns The found product or null if not found.
   */
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  /**
   * Find a product by its ID, including soft-deleted products.
   * @param id - The ID of the product to find.
   * @returns The found product or null if not found.
   */
  async findOneActive(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id, deleteFlag: DeleteFlag.ACTIVE },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  /**
   * Create a new product.
   * @param product - The product data to create.
   * @returns The created product.
   */
  async create(product: CreateProductDto): Promise<Product> {
    return this.productRepository.save(product);
  }

  /**
   * Create multiple products.
   * @param products - An array of product data to create.
   * @returns The created products.
   */
  async createMany(products: CreateProductDto[]): Promise<Product[]> {
    return this.productRepository.save(products);
  }

/**
 * Update a product by its ID.
 * @param id - The ID of the product to update.
 * @param product - The product data to update.
 * @returns The updated product or throws an error if not found.
 */
async update(id: number, product: Partial<CreateProductDto>): Promise<Product> {
  const existingProduct = await this.productRepository.findOne({ where: { id } });
  if (!existingProduct) {
    throw new NotFoundException(`Product with ID ${id} not found`);
  }
  await this.productRepository.update(id, product);
  const updatedProduct = await this.productRepository.findOne({ where: { id } });
  if (!updatedProduct) {
    throw new NotFoundException(`Product with ID ${id} not found after update`);
  }
  return updatedProduct;
}


// async updateMany(products: Partial<CreateProductDto>[]): Promise<Product[]> {
//   const updatedProducts: Product[] = [];  
//   for (const product of products) {
//     const existingProduct = await this.productRepository.findOne({ where: { id: product.id } });    
//     if (!existingProduct) {
//       throw new NotFoundException(`Product with ID ${product.id} not found`);
//     }
//     await this.productRepository.update(product.id, product);
//     const updatedProduct = await this.productRepository.findOne({ where: { id: product.id } });
//     if (!updatedProduct) {
//       throw new NotFoundException(`Product with ID ${product.id} not found after update`);
//     }
//     updatedProducts.push(updatedProduct);
//   }
//   return updatedProducts;
// }
  /**
   * Hard delete a product by its ID.
   * @param id - The ID of the product to hard delete.
   * @throws Error if the product is not found.
   */
  async hardDelete(id: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.productRepository.delete(id);
  }

  /**
   * Soft delete a product by setting its deleteFlag to DELETED.
   * @param id - The ID of the product to soft delete.
   * @throws Error if the product is not found or already deleted.
   */
  async softDelete(id: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product || product.deleteFlag === DeleteFlag.DELETED) {
      throw new NotFoundException('Product not found');
    }
    product.deleteFlag = DeleteFlag.DELETED;
    await this.productRepository.update(id, product);
  }
}
