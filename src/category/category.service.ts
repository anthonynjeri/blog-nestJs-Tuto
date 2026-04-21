import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/request/create-category.dto';
import { CategoryRepository } from './category.repository';
import { CategoryMapper } from './category.mapper';
import { CategoryPaginatedQueryDto } from './dto/request/category-paginated-query.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private categoryMapper: CategoryMapper,
  ) {}
  async create(authorId: string, createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.createCategory(
      authorId,
      createCategoryDto,
    );
    return this.categoryMapper.toGetLightCategoryNoAuthorDto(category);
  }

  // async findAll() {
  //   const categories = await this.categoryRepository.findAll();
  //
  //   return categories.map((category) =>
  //     this.categoryMapper.toGetCategoryLightDto(category),
  //   );
  // }

  async getCategoriesPaginated(
    categoryPaginatedQuery: CategoryPaginatedQueryDto,
  ) {
    const categoriesPaginated = await this.categoryRepository.findPaginated(
      categoryPaginatedQuery,
    );
    return this.categoryMapper.toGetCategoriesPaginatedDto(
      categoryPaginatedQuery,
      categoriesPaginated.results,
      categoriesPaginated.totalCount,
    );
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne(id);
    return this.categoryMapper.toGetCategoryDto(category);
  }
}
