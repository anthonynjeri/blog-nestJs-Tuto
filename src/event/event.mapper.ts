import { CategoryMapper } from '../category/category.mapper';
import { UsersMapper } from '../users/users.mapper';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CommentEventDocument } from './comment-event.schema';
import { LikeEventDocument } from './like-event.schema';
import { LikeEventDto } from './dto/response/like-event.dto';
import { CommentEventDto } from './dto/response/comment-event.dto';
import { EventUnion } from './event.type';
import { PostsMapper } from '../posts/posts.mapper';

@Injectable()
export class EventMapper {
  constructor(
    private usersMapper: UsersMapper,
    private categoryMapper: CategoryMapper,
    private postsMapper: PostsMapper,
  ) {}

  toGetEventDto(events: EventUnion[]) {
    return {
      events: events.map((event) => {
        if (event.kind === 'LikeEvent') {
          return this.toGetLikeEventDto(event);
        } else if (event.kind === 'CommentEvent') {
          return this.toGetCommentEventDto(event);
        }
      }),
    };
  }

  toGetCommentEventDto(
    commentEventDocument: CommentEventDocument,
  ): CommentEventDto {
    console.log(commentEventDocument);
    if (commentEventDocument.post instanceof Types.ObjectId) {
      throw new InternalServerErrorException('Post not Populated');
    }

    if (commentEventDocument.author instanceof Types.ObjectId) {
      throw new InternalServerErrorException('Author not Populated');
    }
    return {
      id: commentEventDocument.id,
      kind: commentEventDocument.kind,
      createdAt: commentEventDocument.createdAt,
      post: this.postsMapper.toGetLightPostsDto(commentEventDocument.post),
      author: this.usersMapper.toGetUserDto(commentEventDocument.author),
      comment: commentEventDocument.comment,
    };
  }

  toGetLikeEventDto(likeEventDocument: LikeEventDocument): LikeEventDto {
    console.log(likeEventDocument);
    if (likeEventDocument.category instanceof Types.ObjectId) {
      throw new InternalServerErrorException('Category not Populated');
    }
    if (likeEventDocument.author instanceof Types.ObjectId) {
      throw new InternalServerErrorException('Author not Populated');
    }
    return {
      id: likeEventDocument.id,
      kind: likeEventDocument.kind,
      createdAt: likeEventDocument.createdAt,
      category: this.categoryMapper.toGetCategoryLightDto(
        likeEventDocument.category,
      ),
      author: this.usersMapper.toGetUserDto(likeEventDocument.author),
    };
  }
  // toGetCommentEventDto(comment: CommentDocument): CommentEventDto {
  //   if (comment.category instanceof Types.ObjectId) {
  //     throw new InternalServerErrorException(
  //       'Category is required not populatec',
  //     );
  //   }
  //   if (comment.author instanceof Types.ObjectId) {
  //     throw new InternalServerErrorException('Author is not populated');
  //   }
  //
  //   return {
  //     id: comment.id,
  //     kind: comment.kind,
  //     comment: comment.comment,
  //     author: comment.author,
  //     category: comment.category,
  //   };
  // }
  //
  // toGetEventDto(event: EventDocument): GetEventDto {
  //   console.log('Event in EventMapper', event);
  //   if (event.category instanceof Types.ObjectId) {
  //     throw new InternalServerErrorException('Category is not populated');
  //   }
  //   if (event.author instanceof Types.ObjectId) {
  //     throw new InternalServerErrorException('Author is not populated');
  //   }
  //   return {
  //     id: event.id,
  //     kind: event.kind,
  //     category: this.categoryMapper.toGetCategoryLightDto(event.category),
  //     author: this.usersMapper.toGetUserDto(event.author),
  //   };
  // }
  //
  // toGetLikeEventDto(like: LikeDocument): LikeEventDto {
  //   if (like.category instanceof Types.ObjectId) {
  //     throw new InternalServerErrorException(
  //       'Category is required | not populated',
  //     );
  //   }
  //   if (like.author instanceof Types.ObjectId) {
  //     throw new InternalServerErrorException('Author is not populated');
  //   }
  //
  //   console.log('like-category: ', like.category);
  //
  //   return {
  //     id: like.id,
  //     kind: like.kind,
  //     category: like.category,
  //     author: like.author,
  //   };
  // }
}
