import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class S3File {
  @Prop({ required: true })
  key: string;

  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  mimeType: string;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ required: true })
  size: number;
}

export const S3FileSchema = SchemaFactory.createForClass(S3File);
