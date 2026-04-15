import { GetPostDto } from './dto/response/get-post.dto';
import { PostDocument } from './schemas/post.schema';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CategoryMapper } from '../category/category.mapper';

@Injectable()
export class PostsMapper {
  constructor(private readonly categoryMapper: CategoryMapper) {}
  toGetPostDto(post: PostDocument): GetPostDto {
    if (post.category instanceof Types.ObjectId)
      throw new InternalServerErrorException("Category doesn't exist!");
    return {
      id: post._id.toString(),
      category: this.categoryMapper.toGetCategoryDto(post.category),
      title: post.title,
      description: post.description,
    };
  }
}
