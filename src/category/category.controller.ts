import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/request/create-category.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryPaginatedQueryDto } from './dto/request/category-paginated-query.dto';
import { CreateCommentDto } from '../event/dto/request/create-comment.dto';
import { ConnectedUser } from '../users/_utils/decorator/connected-user.decorator';
import { Protect } from '../auth/_utils/decorator/protect.decorator';

@ApiTags('Categories')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Protect()
  @Post()
  create(@ConnectedUser() user, @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(user.id, createCategoryDto);
  }

  @Protect()
  @Get('all')
  getAllCategories() {
    const categories = this.categoryService.findAll();
    console.log(categories);
    return categories;
  }

  @Protect()
  @Patch(':categoryId')
  update(
    @Param('categoryId') categoryId: string,
    @Body() updatedCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.updateCategory(categoryId, updatedCategoryDto);
  }

  @Protect()
  @Get(':categoryId')
  getOne(@Param('categoryId') id: string) {
    return this.categoryService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: "Get all categories in pagination's" })
  getCategoryPaginated(
    @Query() categoryPaginatedQuery: CategoryPaginatedQueryDto,
  ) {
    return this.categoryService.getCategoriesPaginated(categoryPaginatedQuery);
  }

  @Protect()
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }

  @Protect()
  @Post(':categoryId/like')
  likeACategory(@ConnectedUser() user, @Param('categoryId') id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return this.categoryService.likeACategory(id, user.id);
  }

  @Protect()
  @Post(':categoryId/comment')
  commentOnACategory(
    @ConnectedUser() user,
    @Param('categoryId') categoryId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.categoryService.commentOnACategory(
      user.id,
      categoryId,
      createCommentDto,
    );
  }
}
