import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Event, EventsType } from './event.schema';
import { CategoryDocument } from '../category/schemas/category.schema';
import { User, UserDocument } from '../users/schemas/users.schema';

export type LikeEventDocument = HydratedDocument<LikeEvent>;

@Schema()
export class LikeEvent extends Event {
  declare kind: 'LikeEvent';

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: Types.ObjectId | CategoryDocument;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name, required: true })
  author: Types.ObjectId | UserDocument;
}

export const LikeEventSchema = SchemaFactory.createForClass(LikeEvent);
