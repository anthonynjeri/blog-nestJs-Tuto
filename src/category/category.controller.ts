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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryPaginatedQueryDto } from './dto/request/category-paginated-query.dto';
import { CreateCommentDto } from '../event/dto/request/create-comment.dto';
import { ConnectedUser } from '../users/decorators/connected-user.decorator';

@ApiTags('Categories')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@ConnectedUser() user, @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(user.id, createCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':categoryId')
  update(
    @Param('categoryId') categoryId: string,
    @Body() updatedCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.updateCategory(categoryId, updatedCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':categoryId')
  getOne(@Param('categoryId') id: string) {
    return this.categoryService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: "Get all categories in pagination's" })
  getCategoryPaginated(
    @Query() categoryPaginatedQuery: CategoryPaginatedQueryDto,
  ) {
    return this.categoryService.getCategoriesPaginated(categoryPaginatedQuery);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':categoryId/like')
  likeACategory(@ConnectedUser() req, @Param('categoryId') id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return this.categoryService.likeACategory(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':categoryId/comment')
  commentOnACategory(
    @ConnectedUser() req,
    @Param('categoryId') categoryId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.categoryService.commentOnACategory(
      req.user.id,
      categoryId,
      createCommentDto,
    );
  }
}
