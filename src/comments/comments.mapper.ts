import { CommentsDocument } from './schemas/comments.schema';
import { PostsMapper } from '../posts/posts.mapper';
import { Types } from 'mongoose';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersMapper } from '../users/users.mapper';
import { GetCommentsDto } from './dto/response/get-comments.dto';
import { DeeplLanguageClient } from '../_utils/translator/deepl-language.client';
import { DeeplLanguageService } from '../_utils/translator/deepl-language.service';

@Injectable()
export class CommentsMapper {
  constructor(
    private readonly postsMapper: PostsMapper,
    private readonly usersMapper: UsersMapper,
    private readonly deeplLanguageService: DeeplLanguageService,
  ) {}

  toGetCommentDto(comment: CommentsDocument): GetCommentsDto {
    if (comment.post instanceof Types.ObjectId) {
      throw new InternalServerErrorException('Post in comment not populated');
    }
    if (comment.author instanceof Types.ObjectId) {
      throw new InternalServerErrorException('Author in comment not populated');
    }
    return {
      id: comment._id.toString(),
      comment: this.deeplLanguageService.getTextTranslated(comment.comment),
      post: this.postsMapper.toGetLightPostsDto(comment.post),
      author: this.usersMapper.toGetUserDto(comment.author),
    };
  }
}
