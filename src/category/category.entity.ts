import { DeleteFlag } from 'src/common/enums/delete-flag.enum';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('category')
export class Category{
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'category_name', length: 255, nullable: false })
  name: string;

  @Column('text', {name: 'description', nullable: true })
  description: string;

  @Column({name: 'image_url', nullable: false })
  imageUrl: string;

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
