import { Inject, Injectable } from '@nestjs/common';

import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './dto/request/create-post.dto';
import { UpdatePostDto } from './dto/request/update-post.dto';
import { Types } from 'mongoose';
import { PostsMapper } from './posts.mapper';
import { CategoryMapper } from '../category/category.mapper';
import { UsersMapper } from '../users/users.mapper';
import { PostsPaginatedQueryDto } from './dto/request/posts-paginated-query.dto';
import { TranslateService } from '../translator/translate.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class PostsService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly postsRepository: PostsRepository,
    private readonly usersMapper: UsersMapper,
    private readonly postsMapper: PostsMapper,
    private readonly category: CategoryMapper,
    private readonly translateService: TranslateService,
  ) {}
  async findAllPosts() {
    return this.postsRepository
      .findAllPosts()
      .then((posts) =>
        posts.map((post) => this.postsMapper.toGetPostDto(post)),
      );
  }

  async findOnePostAndTranslate(postId: string, lang: string) {
    const cachedPost = await this.cacheManager.get(postId);
    if (cachedPost) {
      console.log(cachedPost);
      return cachedPost;
    }
    const post = await this.postsRepository.findOnePost(postId);

    const translatedPost = this.translateService.getTextTranslation(
      post.title,
      post.description,
      lang,
    );

    await this.cacheManager.set(post.id, translatedPost);
    // console.log(this.cacheManager.clear());
    return translatedPost;
  }

  async getPostsPaginated(postsPaginatedQuery: PostsPaginatedQueryDto) {
    const [totalCount, results] =
      await this.postsRepository.findPaginated(postsPaginatedQuery);
    return this.postsMapper.toGetPaginatedPostsDto(
      postsPaginatedQuery,
      results,
      totalCount,
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

    return this.postsMapper.toGetPostDto(post);
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto) {
    return this.postsRepository.updatePost(id, updatePostDto);
  }

  async deletePost(id: string) {
    return this.postsRepository.deletePost(id);
  }

  async deletePostsByCategoryId(id: string) {
    return this.postsRepository.deleteMany(id);
  }
}
