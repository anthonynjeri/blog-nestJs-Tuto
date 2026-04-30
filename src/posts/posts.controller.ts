import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/request/create-post.dto';
import { UpdatePostDto } from './dto/request/update-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostsPaginatedQueryDto } from './dto/request/posts-paginated-query.dto';
import { ConnectedUser } from '../users/_utils/decorator/connected-user.decorator';
import { Protect } from '../auth/_utils/decorator/protect.decorator';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly jwtAuthGuard: JwtAuthGuard,
  ) {}

  @Protect()
  @Post(':categoryId')
  create(
    @ConnectedUser() user,
    @Param('categoryId') categoryId: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    console.log(createPostDto);

    return this.postsService.createPost(categoryId, user.id, createPostDto);
  }

  @Protect()
  @Get()
  get(@Query() postsPaginatedQuery: PostsPaginatedQueryDto) {
    // return this.postsService.findAllPosts();
    return this.postsService.getPostsPaginated(postsPaginatedQuery);
  }

  @Protect()
  @Get('all')
  findAll() {
    return this.postsService.findAllPosts();
  }

  @Protect()
  @Get(':categoryId')
  getOne(@Param('categoryId') categoryId: string) {
    return this.postsService.findPostByCategory(categoryId);
  }

  @Protect()
  @Put(':id')
  update(
    @ConnectedUser() user,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    console.log(id);
    console.log(updatePostDto);
    return this.postsService.updatePost(id, updatePostDto);
  }

  @Protect()
  @Delete(':id')
  delete(@ConnectedUser() user, @Param('id') id: string) {
    return this.postsService.deletePost(id);
  }

  //   Posts with translation
  @UseInterceptors(CacheInterceptor)
  @CacheKey('postId')
  @CacheTTL(0)
  @Protect()
  @Get(':id/translate')
  translatePost(@Param('id') id: string, @Query('lang') lang: string = 'fr') {
    return this.postsService.findOnePostAndTranslate(id, lang);
  }
}
