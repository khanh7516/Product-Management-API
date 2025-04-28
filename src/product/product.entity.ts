import e from 'express';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum ProductStatus {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
}

@Entity('product')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('decimal', { nullable: false })
  price: number;

  @Column({ nullable: false })
  imageUrl: string;

  @Column('enum', { enum: ProductStatus, default: ProductStatus.AVAILABLE })
  status: ProductStatus;

  @Column('date', { nullable: true })
  releaseDate: string;
}
