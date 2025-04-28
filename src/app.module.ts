import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { ProductController } from './product/product.controller';

@Module({
  imports: [ProductModule, CategoryModule, UserModule],
  controllers: [AppController, ProductController],
  providers: [AppService],
})
export class AppModule {}
