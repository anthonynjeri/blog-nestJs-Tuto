import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CategoryMapper } from '../category/category.mapper';
import { UsersMapper } from '../users/users.mapper';
import { LikesDocument } from './schemas/likes.schema';
import { Types } from 'mongoose';
import { GetLikesDto } from './dto/response/get-likes.dto';

@Injectable()
export class LikesMapper {
  constructor(
    private readonly categoryMapper: CategoryMapper,
    private readonly usersMapper: UsersMapper,
  ) {}

  toGetLikesDto(likes: LikesDocument): GetLikesDto {
    if (likes.category instanceof Types.ObjectId) {
      throw new InternalServerErrorException('Category in like not populated');
    }

    if (likes.author instanceof Types.ObjectId) {
      throw new InternalServerErrorException('Author in like not populated');
    }

    return {
      id: likes._id.toString(),
      category: this.categoryMapper.toGetCategoryLightDto(likes.category),
      author: this.usersMapper.toGetUserDto(likes.author),
    };
  }
}
