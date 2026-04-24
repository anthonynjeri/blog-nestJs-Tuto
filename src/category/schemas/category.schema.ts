import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { User, UserDocument } from '../../users/schemas/users.schema';
import { LikeDocument, LikeEvent } from '../../event/like-event.schema';
import {
  CommentDocument,
  CommentEvent,
} from '../../event/comment-event.schema';

export type CategoryDocument = HydratedDocument<Category>;
export interface ICategoryEvents {
  likes: LikeDocument[];
  comments: CommentDocument[];
}

export type CategoryEventDocument = HydratedDocument<
  CategoryDocument,
  ICategoryEvents
>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Category {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  author: Types.ObjectId | UserDocument;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.virtual('likes', {
  ref: 'LikeEvent',
  localField: '_id',
  foreignField: 'category',
  $match: { kind: 'LikeEvent' },
});

CategorySchema.virtual('comments', {
  ref: 'CommentEvent',
  localField: '_id',
  foreignField: 'category',
  $match: { kind: 'CommentEvent' },
});
