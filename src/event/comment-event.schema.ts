import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Event } from './event.schema';
import { User, UserDocument } from '../users/schemas/users.schema';
import { PostDocument } from '../posts/schemas/post.schema';

export type CommentEventDocument = HydratedDocument<CommentEvent>;
@Schema()
export class CommentEvent extends Event {
  declare kind: 'CommentEvent';

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'Post',
    required: true,
  })
  post: Types.ObjectId | PostDocument;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name, required: true })
  author: Types.ObjectId | UserDocument;

  @Prop({ required: true })
  comment: string;
}

export const CommentEventSchema = SchemaFactory.createForClass(CommentEvent);
