import mongoose, { HydratedDocument, Types } from 'mongoose';
import { PostDocument } from '../../posts/schemas/post.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserDocument } from '../../users/schemas/users.schema';
import e from 'express';

export type CommentsDocument = HydratedDocument<Comments>;
@Schema({ timestamps: true })
export class Comments {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  })
  post: Types.ObjectId | PostDocument;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  author: Types.ObjectId | UserDocument;

  @Prop({
    required: true,
  })
  comment: string;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
