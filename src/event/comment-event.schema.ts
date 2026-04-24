import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Event } from './event.schema';

export type CommentDocument = HydratedDocument<CommentEvent>;
@Schema()
export class CommentEvent {
  kind: string;
  category: Types.ObjectId;
  author: Types.ObjectId;

  @Prop({ required: true })
  comment: string;
}

export const CommentEventSchema = SchemaFactory.createForClass(CommentEvent);
