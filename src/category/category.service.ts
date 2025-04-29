import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { DeleteFlag } from 'src/common/enums/delete-flag.enum';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoryService {
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>;


    /**
     * Get all active categories from the database.
     * @returns All active categories.
     */
    async getCategories() {
        return this.categoryRepository.find({
            where: { deleteFlag: DeleteFlag.ACTIVE },
        });
    }    

    /**
     * Get a category by its ID.
     * @param id - The ID of the category to find.
     * @returns The found category or null if not found.
     */
    async createCategory(category: CreateCategoryDto): Promise<Category> {
        return this.categoryRepository.save(category);
    }

    /**
     * Find a category by its ID.
     * @param id - The ID of the category to find.
     * @returns The found category or null if not found.
     */
    async createManyCategories(categories: CreateCategoryDto[]): Promise<Category[]> {
        return this.categoryRepository.save(categories);
    }

    /**
     * Find a category by its ID.
     * @param id - The ID of the category to find.
     * @returns The found category or null if not found.
     *  */
    async updateCategory(id: number, category: Partial<CreateCategoryDto>): Promise<Category> {
        const existingCategory = await this.categoryRepository.findOne({ where: { id } });
        if (!existingCategory) {
            throw new NotFoundException('Category not found');
        }
        Object.assign(existingCategory, category);
        return this.categoryRepository.save(existingCategory);
    }

    /**
     * Soft delete a category by its ID.
     * @param id - The ID of the category to soft delete.
     * @returns The updated category or null if not found.
     */
    async softDeleteCategory(id: number): Promise<void> {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new NotFoundException('Category not found');
        }
        category.deleteFlag = DeleteFlag.DELETED;
        await this.categoryRepository.save(category); 
    }
}
