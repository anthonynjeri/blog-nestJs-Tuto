import { Injectable, NotFoundException } from '@nestjs/common';
import { Comments } from './schemas/comments.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateNewCommentDto } from './dto/request/create-new-comment.dto';
import { UpdateCommentDto } from './dto/request/update-comment.dto';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectModel(Comments.name) private readonly commentModel: Model<Comments>,
  ) {}

  async create(
    post: string,
    author: string,
    createCommentDto: CreateNewCommentDto,
  ) {
    const comment = await this.commentModel.create({
      post: new Types.ObjectId(post),
      author: new Types.ObjectId(author),
      comment: createCommentDto.comment,
    });

    await comment.populate(['post', 'author']);
    return comment.save();
  }

  async getAllComments() {
    return this.commentModel.find().populate(['post', 'author']).exec();
  }

  async getCommentsByPostId(postId: string) {
    return this.commentModel
      .find({ post: postId })
      .populate(['author', 'post'])
      .exec();
  }

  async updateComment(commentId: string, updateCommentDto: UpdateCommentDto) {
    return this.commentModel
      .findOneAndUpdate({ _id: commentId }, updateCommentDto, {
        returnDocument: 'after',
      })
      .orFail(new NotFoundException('Comment not found'))
      .populate(['post', 'author'])
      .exec();
  }
}
