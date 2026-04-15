import { Injectable } from '@nestjs/common';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/request/create-category.dto';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.createCategory(createCategoryDto);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }
}
