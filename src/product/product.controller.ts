import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductService } from './product.service';
import { GetProductParam } from './dtos/get-product-param.dto';

@Controller('products')
export class ProductController {
  @Inject()
  private readonly productService: ProductService;

  @Get()
  listProducts() {
    return this.productService.findAll();
  }

  @Get('/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  getProductById(@Param() getProductParam: GetProductParam) {
    return this.productService.findOne(getProductParam.id);
  }

  @Post()
  createProduct(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }
}
