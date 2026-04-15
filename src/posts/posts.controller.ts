import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/request/create-post.dto';
import { UpdatePostDto } from './dto/request/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post(':categoryId')
  create(
    @Param('categoryId') categoryId: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    console.log(createPostDto);
    return this.postsService.createPost(categoryId, createPostDto);
  }

  @Get()
  get() {
    return this.postsService.findAllPosts();
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
