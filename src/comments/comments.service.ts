import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CreateNewCommentDto } from './dto/request/create-new-comment.dto';
import { CommentsMapper } from './comments.mapper';
import { UpdateCommentDto } from './dto/request/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    private commentsRepository: CommentsRepository,
    private commentsMapper: CommentsMapper,
  ) {}

  async create(
    post: string,
    author: string,
    createCommentDto: CreateNewCommentDto,
  ) {
    const commment = await this.commentsRepository.create(
      post,
      author,
      createCommentDto,
    );

    return this.commentsMapper.toGetCommentDto(commment);
  }

  async getAllComments() {
    const comments = await this.commentsRepository.getAllComments();

    // console.log(comments);
    return comments.map((comment) =>
      this.commentsMapper.toGetCommentDto(comment),
    );
  }

  async getCommentsByPostId(postId: string) {
    const comments = await this.commentsRepository.getCommentsByPostId(postId);

    return comments.map((comment) =>
      this.commentsMapper.toGetCommentDto(comment),
    );
  }

  async updateComment(commentId: string, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentsRepository.updateComment(
      commentId,
      updateCommentDto,
    );

    return this.commentsMapper.toGetCommentDto(comment);
  }
}
