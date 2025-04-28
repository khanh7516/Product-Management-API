import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum DeleteFlag {
  ACTIVE = '1',
  DELETED = '0',
}

export abstract class BaseEntity {
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @Column({ type: 'enum', enum: DeleteFlag, default: DeleteFlag.ACTIVE })
  deleteFlag: DeleteFlag;
}
