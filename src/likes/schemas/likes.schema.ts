import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { CategoryDocument } from '../../category/schemas/category.schema';
import { UserDocument } from '../../users/schemas/users.schema';

export type LikesDocument = HydratedDocument<Likes>;
@Schema({ timestamps: true })
export class Likes {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: Types.ObjectId | CategoryDocument;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  author: Types.ObjectId | UserDocument;
}

export const LikesSchema = SchemaFactory.createForClass(Likes);
