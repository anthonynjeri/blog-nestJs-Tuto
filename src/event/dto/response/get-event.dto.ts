import { ApiProperty } from '@nestjs/swagger';
import type { EventsType } from '../../event.schema';

export class GetEventDto {
  @ApiProperty()
  id: string;

  @ApiProperty({
    enum: ['LikeEvent', 'CommentEvent'],
  })
  kind: EventsType;

  @ApiProperty()
  createdAt: Date;
}
