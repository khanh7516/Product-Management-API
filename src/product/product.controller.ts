import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';

@Controller('products')
export class ProductController {
    @Get()
    listProducts(){
        return "list of product";
    }

    @Get("/:id")
    getProductById(@Param('id') id: string) {
        return "product";
    }

    @Post()
    createProduct(@Body() body: CreateProductDto) {
        return "product created";
    }





}

