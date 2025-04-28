import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { DeleteFlag } from 'src/common/entities/base.entity';
import { CreateProductDto } from './dtos/create-product.dto';

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
  async findOne(id: number): Promise<Product | null> {
    return this.productRepository.findOne({ where: { id } });
  }

  /**
   * Find a product by its ID, including soft-deleted products.
   * @param id - The ID of the product to find.
   * @returns The found product or null if not found.
   */
  async findOneActive(id: number): Promise<Product | null> {
    return this.productRepository.findOne({
      where: { id, deleteFlag: DeleteFlag.ACTIVE },
    });
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
   * Update a product by its ID.
   * @param id - The ID of the product to update.
   * @param product - The product data to update.
   * @returns The updated product or null if not found.
   */
  async update(id: number, product: Partial<Product>): Promise<Product | null> {
    await this.productRepository.update(id, product);
    return this.productRepository.findOne({ where: { id } });
  }

  /**
   * Hard delete a product by its ID.
   * @param id - The ID of the product to hard delete.
   * @throws Error if the product is not found.
   */
  async hardDelete(id: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error('Product not found');
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
      throw new Error('Product not found');
    }
    product.deleteFlag = DeleteFlag.DELETED;
    await this.productRepository.update(id, product);
  }
}
