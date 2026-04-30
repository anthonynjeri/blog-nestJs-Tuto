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

    return await this.commentsMapper.toGetCommentDto(commment);
  }

  async getAllComments() {
    const comments = await this.commentsRepository.getAllComments();
    // console.log(comments)
    const parsedComments = await Promise.all(
      comments.map((comment) => this.commentsMapper.toGetCommentDto(comment)),
    );

    console.log('Parsed-Comments :', parsedComments);
    return parsedComments;
  }

  async getCommentsByPostId(postId: string) {
    const comments = await this.commentsRepository.getCommentsByPostId(postId);

    return await Promise.all(
      comments.map((comment) => this.commentsMapper.toGetCommentDto(comment)),
    );
  }

  async updateComment(commentId: string, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentsRepository.updateComment(
      commentId,
      updateCommentDto,
    );

    return await this.commentsMapper.toGetCommentDto(comment);
  }
}
