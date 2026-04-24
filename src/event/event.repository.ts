import { InjectModel } from '@nestjs/mongoose';
import { Event } from './event.schema';
import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/request/create-comment.dto';
import { CommentEvent } from './comment-event.schema';
import { LikeEvent } from './like-event.schema';

@Injectable()
export class EventRepository {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  async likePost(authorId: string, category: string) {
    const likeEvent = await this.eventModel.create({
      kind: 'LikeEvent',
      category: new Types.ObjectId(category),
      author: new Types.ObjectId(authorId),
    } as LikeEvent);

    return likeEvent.save();
  }

  async commentPost(
    authorId: string,
    category: string,
    commentDto: CreateCommentDto,
  ) {
    const commentEvent = await this.eventModel.create({
      kind: 'CommentEvent',
      category: new Types.ObjectId(category),
      author: new Types.ObjectId(authorId),
      comment: commentDto.comment,
    } as CommentEvent);

    return commentEvent.save();
  }
}
