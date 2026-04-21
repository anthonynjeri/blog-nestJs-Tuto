import { Injectable } from '@nestjs/common';

import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './dto/request/create-post.dto';
import { UpdatePostDto } from './dto/request/update-post.dto';
import { Types } from 'mongoose';
import { PostsMapper } from './posts.mapper';
import { CategoryMapper } from '../category/category.mapper';
import { UsersMapper } from '../users/users.mapper';
import { PostsPaginatedQueryDto } from './dto/request/posts-paginated-query.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly usersMapper: UsersMapper,
    private readonly postsMapper: PostsMapper,
    private readonly category: CategoryMapper,
  ) {}
  // async findAllPosts() {
  //   return this.postsRepository
  //     .findAllPosts()
  //     .then((posts) =>
  //       posts.map((post) => this.postsMapper.toGetPostDto(post)),
  //     );
  // }
  async getPostsPaginated(postsPaginatedQuery: PostsPaginatedQueryDto) {
    const postsPaginated =
      await this.postsRepository.findPaginated(postsPaginatedQuery);
    return this.postsMapper.toGetPaginatedPostsDto(
      postsPaginatedQuery,
      postsPaginated.results,
      postsPaginated.totalCount,
    );
  }

  async findPostByCategory(categoryId: string) {
    const posts = await this.postsRepository.findPostsByCategory(
      new Types.ObjectId(categoryId),
    );

    return posts;
  }

  async createPost(
    categoryId: string,
    authorId: string,
    createPostDto: CreatePostDto,
  ) {
    const post = await this.postsRepository.createPost(
      categoryId,
      authorId,
      createPostDto,
    );

    return post;
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto) {
    return this.postsRepository.updatePost(id, updatePostDto);
  }

  async deletePost(id: string) {
    return this.postsRepository.deletePost(id);
  }
}
