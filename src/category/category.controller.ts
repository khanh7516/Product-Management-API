import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CategoryResponseDto } from './dtos/response/category.response';
import { plainToClass } from 'class-transformer';

@Controller('categories')
export class CategoryController {
  @Inject()
  private readonly categoryService: CategoryService;

    @Get()
    async getCategories() {
        const categories = await this.categoryService.getCategories();
        return categories.map((category) => 
            plainToClass(CategoryResponseDto, category, {
                excludeExtraneousValues: true 
            })
        );
    }

    @Post()
    async createCategory(@Body() body: CreateCategoryDto) {
        const category = await this.categoryService.createCategory(body);
        return plainToClass(CategoryResponseDto, category, {
            excludeExtraneousValues: true  
        });
    }

    @Post('/multiple')
    async createManyCategories(@Body() body: CreateCategoryDto[]) {
        const categories = await this.categoryService.createManyCategories(body);
        return categories.map((category) => 
            plainToClass(CategoryResponseDto, category, {
                excludeExtraneousValues: true 
            })
        );
    }
}
