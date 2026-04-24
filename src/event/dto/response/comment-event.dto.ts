import { EventsBaseDto } from './events-base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CommentEventDto extends EventsBaseDto {
  @ApiProperty()
  comment: string;
}
