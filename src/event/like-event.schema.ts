import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Event } from './event.schema';

export type LikeDocument = HydratedDocument<LikeEvent>;

@Schema()
export class LikeEvent {
  kind: string;
  category: Types.ObjectId;
  author: Types.ObjectId;
}

export const LikeEventSchema = SchemaFactory.createForClass(LikeEvent);
