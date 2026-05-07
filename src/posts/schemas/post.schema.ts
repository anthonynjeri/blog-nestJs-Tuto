import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import {
  Category,
  CategoryDocument,
} from '../../category/schemas/category.schema';
import { User, UserDocument } from '../../users/schemas/users.schema';
import { S3File, S3FileSchema } from '../../storage/schemas/s3-file.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Category.name,
    required: true,
  })
  category: Types.ObjectId | CategoryDocument;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: S3FileSchema, default: null })
  postImage?: S3File | null;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  author: Types.ObjectId | UserDocument;

  @Prop({ type: Map, default: new Map() })
  translations: Map<string, { title: string; description: string }>;
}

export const PostSchema = SchemaFactory.createForClass(Post);
