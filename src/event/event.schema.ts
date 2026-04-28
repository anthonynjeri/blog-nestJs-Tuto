import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;
export type EventsType = 'LikeEvent' | 'CommentEvent';
@Schema({ timestamps: true, discriminatorKey: 'kind' })
export class Event {
  kind: EventsType;

  createdAt: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
