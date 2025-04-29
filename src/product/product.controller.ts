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
import { ProductResponseDto } from './dtos/response/product.reponse';
import { plainToClass } from 'class-transformer';

@Controller('products')
export class ProductController {
  @Inject()
  private readonly productService: ProductService;

  @Get()
  async listProducts(): Promise<ProductResponseDto[]> {
    const products = await this.productService.findAll();
    return products.map((product) =>
      plainToClass(ProductResponseDto, product, {
        excludeExtraneousValues: true
      })
    );
  }
  
  @Get('/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getProductById(@Param() getProductParam: GetProductParam): Promise<ProductResponseDto> {
    const product = await this.productService.findOne(getProductParam.id);
    return plainToClass(ProductResponseDto, product, {
      excludeExtraneousValues: true
    });
  }
  
  @Post()
  async createProduct(@Body() body: CreateProductDto) {
    const product = await this.productService.create(body);
    return plainToClass(ProductResponseDto, product, {
      excludeExtraneousValues: true
    });
  }
  
  @Post('/multiple')
  async createMultipleProducts(@Body() body: CreateProductDto[]) {
    const products = await this.productService.createMany(body);
    return products.map((product) => plainToClass(ProductResponseDto, product, {
      excludeExtraneousValues: true
    }));
  }
}
