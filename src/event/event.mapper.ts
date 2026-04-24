import { CategoryMapper } from '../category/category.mapper';
import { UsersMapper } from '../users/users.mapper';
import { GetEventDto } from './dto/response/get-event.dto';
import { EventDocument } from './event.schema';
import { InternalServerErrorException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CommentDocument } from './comment-event.schema';
import { LikeDocument } from './like-event.schema';
import { LikeEventDto } from './dto/response/like-event.dto';
import { CommentEventDto } from './dto/response/comment-event.dto';

export class EventMapper {
  constructor(
    private usersMapper: UsersMapper,
    private categoryMapper: CategoryMapper,
  ) {}

  toGetCommentEventDto(comment: CommentDocument): CommentEventDto {
    if (comment.category instanceof Types.ObjectId) {
      throw new InternalServerErrorException(
        'Category is required not populatec',
      );
    }
    if (comment.author instanceof Types.ObjectId) {
      throw new InternalServerErrorException('Author is not populated');
    }

    return {
      id: comment.id,
      kind: comment.kind,
      comment: comment.comment,
      author: comment.author,
      category: comment.category,
    };
  }

  toGetEventDto(event: EventDocument): GetEventDto {
    console.log('Event in EventMapper', event);
    if (event.category instanceof Types.ObjectId) {
      throw new InternalServerErrorException('Category is not populated');
    }
    if (event.author instanceof Types.ObjectId) {
      throw new InternalServerErrorException('Author is not populated');
    }
    return {
      id: event.id,
      kind: event.kind,
      category: this.categoryMapper.toGetCategoryLightDto(event.category),
      author: this.usersMapper.toGetUserDto(event.author),
    };
  }

  toGetLikeEventDto(like: LikeDocument): LikeEventDto {
    if (like.category instanceof Types.ObjectId) {
      throw new InternalServerErrorException(
        'Category is required | not populated',
      );
    }
    if (like.author instanceof Types.ObjectId) {
      throw new InternalServerErrorException('Author is not populated');
    }

    console.log('like-category: ', like.category);

    return {
      id: like.id,
      kind: like.kind,
      category: like.category,
      author: like.author,
    };
  }
}
