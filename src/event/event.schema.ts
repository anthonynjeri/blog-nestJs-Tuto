import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import type { CategoryDocument } from '../category/schemas/category.schema';
import { User, UserDocument } from '../users/schemas/users.schema';

export type EventDocument = HydratedDocument<Event>;
@Schema({ timestamps: true, discriminatorKey: 'kind' })
export class Event {
  @Prop({
    type: String,
    immutable: true,
    required: true,
    enum: ['LikeEvent', 'CommentEvent'],
  })
  kind: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: Types.ObjectId | CategoryDocument;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name, required: true })
  author: Types.ObjectId | UserDocument;
}

export const EventSchema = SchemaFactory.createForClass(Event);
