import { forwardRef, Module } from '@nestjs/common';
import { Event, EventSchema } from './event.schema';
import { LikeEvent, LikeEventSchema } from './like-event.schema';
import { CommentEvent, CommentEventSchema } from './comment-event.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { EventRepository } from './event.repository';
import { CategoryModule } from '../category/category.module';
import { EventMapper } from './event.mapper';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Event.name,
        schema: EventSchema,
        discriminators: [
          { name: LikeEvent.name, schema: LikeEventSchema },
          { name: CommentEvent.name, schema: CommentEventSchema },
        ],
      },
    ]),
    forwardRef(() => CategoryModule),
    UsersModule,
  ],
  providers: [EventRepository, EventMapper],
  exports: [EventRepository, EventMapper],
})
export class EventModule {}
