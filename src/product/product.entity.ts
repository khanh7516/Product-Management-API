
import { DeleteFlag } from 'src/common/enums/delete-flag.enum';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum ProductStatus {
  AVAILABLE = '1',
  UNAVAILABLE = '0',
}

@Entity('product')
export class Product{
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'product_name', length: 255, nullable: false })
  name: string;

  @Column('text', {name: 'description', nullable: true })
  description: string;

  @Column('decimal', {name: 'price', nullable: false })
  price: number;

  @Column({name: 'image_url', nullable: false })
  imageUrl: string;

  @Column('enum', {name: 'status', enum: ProductStatus, default: ProductStatus.AVAILABLE })
  status: ProductStatus;

  @Column('date', {name: 'release_date', nullable: true })
  releaseDate: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
  
  @Column({ name: 'delete_flag', type: 'enum', enum: DeleteFlag, default: DeleteFlag.ACTIVE })
  deleteFlag: DeleteFlag;
}
