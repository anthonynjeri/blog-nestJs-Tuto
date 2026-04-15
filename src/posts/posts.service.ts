import { Injectable } from '@nestjs/common';

import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './dto/request/create-post.dto';
import { UpdatePostDto } from './dto/request/update-post.dto';
import { Types } from 'mongoose';
import { PostsMapper } from './posts.mapper';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly postsMapper: PostsMapper,
  ) {}
  async findAllPosts() {
    const posts = await this.postsRepository.findAllPosts();

    return posts.map((post) => this.postsMapper.toGetPostDto(post));
  }

  async findPostByCategory(categoryId: string) {
    const posts = await this.postsRepository.findPostsByCategory(
      new Types.ObjectId(categoryId),
    );

    return posts;
  }

  async createPost(categoryId: string, createPostDto: CreatePostDto) {
    const post = await this.postsRepository.createPost(
      categoryId,
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
}
