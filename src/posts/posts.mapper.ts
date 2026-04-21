import { GetPostDto } from './dto/response/get-post.dto';
import { PostDocument } from './schemas/post.schema';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CategoryMapper } from '../category/category.mapper';
import { UsersMapper } from '../users/users.mapper';
import { GetPostsLightDto } from './dto/response/get-posts-light.dto';
import { PaginatedQueryDto } from '../_utils/dto/requests/paginated-query.dto';
import { GetPostsPaginatedDto } from './dto/response/get-posts-paginated.dto';

@Injectable()
export class PostsMapper {
  constructor(
    private readonly categoryMapper: CategoryMapper,
    private readonly usersMapper: UsersMapper,
  ) {}
  toGetPostDto(post: PostDocument): GetPostDto {
    if (post.category instanceof Types.ObjectId)
      throw new InternalServerErrorException(
        "Category doesn't exist | not populated!",
      );
    if (post.author instanceof Types.ObjectId) {
      throw new InternalServerErrorException(
        "Author of post doesn't exist | not populated!",
      );
    }

    return {
      id: post._id.toString(),
      title: post.title,
      description: post.description,
      author: this.usersMapper.toGetUserDto(post.author),
      category: this.categoryMapper.toGetCategoryLightDto(post.category),
    };
  }

  toGetLightPostsDto = (post: PostDocument): GetPostsLightDto => ({
    id: post.id,
    title: post.title,
    description: post.description,
  });

  toGetPaginatedPostsDto(
    paginatedQuery: PaginatedQueryDto,
    posts: PostDocument[],
    totalCount: number,
  ) {
    return new GetPostsPaginatedDto(
      posts.map(this.toGetLightPostsDto),
      paginatedQuery,
      totalCount,
    );
  }
}
