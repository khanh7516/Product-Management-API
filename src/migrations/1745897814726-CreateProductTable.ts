import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductTable1745897814726 implements MigrationInterface {
  
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "product" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "description" TEXT,
        "price" DECIMAL NOT NULL,
        "imageUrl" VARCHAR NOT NULL,
        "status" ENUM('1', '0') NOT NULL DEFAULT '1',
        "releaseDate" DATE,
        "createAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updateAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        "deleteFlag" ENUM('1', '0') NOT NULL DEFAULT '1'
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "product";`);
  }
}
