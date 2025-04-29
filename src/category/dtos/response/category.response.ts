import { Expose } from "class-transformer";

export class CategoryResponseDto {

    @Expose()
    id: number;

    @Expose()
    name: string;
    
    @Expose()
    description: string;
    
    @Expose()
    imageUrl: string;

    constructor(partial: Partial<CategoryResponseDto>) {
        Object.assign(this, partial);
    }
}