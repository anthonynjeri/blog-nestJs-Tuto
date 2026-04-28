import { InjectModel } from '@nestjs/mongoose';
import { Event } from './event.schema';
import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/request/create-comment.dto';
import { CommentEvent } from './comment-event.schema';
import { LikeEvent } from './like-event.schema';
import { EventUnion } from './event.type';

@Injectable()
export class EventRepository {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<EventUnion>,
    @InjectModel(CommentEvent.name)
    private readonly commentModel: Model<CommentEvent>,
    @InjectModel(LikeEvent.name)
    private readonly likeEventModel: Model<LikeEvent>,
  ) {}

  async likePost(authorId: string, category: string) {
    const likeEvent = await this.likeEventModel.create({
      category: new Types.ObjectId(category),
      author: new Types.ObjectId(authorId),
    });

    return likeEvent.save();
  }

  async commentPost(
    authorId: string,
    post: string,
    commentDto: CreateCommentDto,
  ) {
    const commentEvent = await this.commentModel.create({
      post: new Types.ObjectId(post),
      author: new Types.ObjectId(authorId),
      comment: commentDto.comment,
    });

    return commentEvent.save();
  }

  async getAllEvents() {
    return this.eventModel
      .find()
      .populate(['author', 'category', 'post'])
      .exec();
  }
}
