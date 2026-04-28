import { Injectable } from '@nestjs/common';
import { LikesRepository } from './likes.repository';
import { LikesMapper } from './likes.mapper';

@Injectable()
export class LikesService {
  constructor(
    private likesRepository: LikesRepository,
    private likesMapper: LikesMapper,
  ) {}

  async likeACategory(catId: string, authorId: string) {
    return await this.likesRepository
      .likeACategory(catId, authorId)
      .then((like) => this.likesMapper.toGetLikesDto(like));
  }

  async getAllLikes() {
    return await this.likesRepository.getLikes().then((likes) => {
      return likes.map((like) => this.likesMapper.toGetLikesDto(like));
    });
  }

  async deleteLike(authorId: string, likeId: string) {
    return await this.likesRepository.deleteLike(authorId, likeId);
  }
}
