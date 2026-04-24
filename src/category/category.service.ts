import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/request/create-category.dto';
import { CategoryRepository } from './category.repository';
import { CategoryMapper } from './category.mapper';
import { CategoryPaginatedQueryDto } from './dto/request/category-paginated-query.dto';
import { PostsService } from '../posts/posts.service';
import { EventMapper } from '../event/event.mapper';
import { CreateCommentDto } from '../event/dto/request/create-comment.dto';
import { EventRepository } from '../event/event.repository';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly eventRepository: EventRepository,
    // @Inject(forwardRef(() => PostsService))
    private readonly postsService: PostsService,
    private categoryMapper: CategoryMapper,
    private eventMapper: EventMapper,
  ) {}
  async create(authorId: string, createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.createCategory(
      authorId,
      createCategoryDto,
    );
    return this.categoryMapper.toGetLightCategoryNoAuthorDto(category);
  }

  async likeACategory(id: string, userId: string) {
    const likeEvent = await this.categoryRepository.likeACategory(id, userId);

    return likeEvent;
  }

  async commentOnACategory(
    authorId: string,
    categoryId: string,
    commentDto: CreateCommentDto,
  ) {
    return this.eventRepository.commentPost(authorId, categoryId, commentDto);
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
    console.log('category', category);
    // return this.categoryRepository.findOne(id);
    return this.categoryMapper.toGetCategoryEventsDto(category);
    // return category;
  }

  async delete(id: string) {
    await this.postsService.deletePostsByCategoryId(id);
    return this.categoryRepository.delete(id);
  }
}
