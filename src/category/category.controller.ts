import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/request/create-category.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryPaginatedQueryDto } from './dto/request/category-paginated-query.dto';
import { CreateCommentDto } from '../event/dto/request/create-comment.dto';

@ApiTags('Categories')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Request() req, @Body() createCategoryDto: CreateCategoryDto) {
    const author = req.user;
    const authorId = author.id;
    return this.categoryService.create(authorId, createCategoryDto);
  }

  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // @Get()
  // get() {
  //   return this.categoryService.findAll();
  // }

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
  likeACategory(@Request() req, @Param('categoryId') id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return this.categoryService.likeACategory(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':categoryId/comment')
  commentOnACategory(
    @Request() req,
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
