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
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/request/create-post.dto';
import { UpdatePostDto } from './dto/request/update-post.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostsPaginatedQueryDto } from './dto/request/posts-paginated-query.dto';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly jwtAuthGuard: JwtAuthGuard,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':categoryId')
  create(
    @Request() req,
    @Param('categoryId') categoryId: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    console.log(createPostDto);
    const author = req.user;
    const authorId = author.id;
    return this.postsService.createPost(categoryId, authorId, createPostDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  get(@Query() postsPaginatedQuery: PostsPaginatedQueryDto) {
    // return this.postsService.findAllPosts();
    return this.postsService.getPostsPaginated(postsPaginatedQuery);
  }

  @Get(':categoryId')
  getOne(@Param('categoryId') categoryId: string) {
    return this.postsService.findPostByCategory(categoryId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    console.log(id);
    console.log(updatePostDto);
    return this.postsService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }
}
