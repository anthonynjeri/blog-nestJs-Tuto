import { ApiProperty } from '@nestjs/swagger';
import { GetUserDto } from '../../../users/_utils/dto/response/get-user-dto';
import { GetEventDto } from './get-event.dto';
import { GetPostsLightDto } from '../../../posts/dto/response/get-posts-light.dto';

export class CommentEventDto extends GetEventDto {
  @ApiProperty({
    enum: ['CommentEvent'],
  })
  declare kind: 'CommentEvent';
  @ApiProperty()
  post: GetPostsLightDto;

  @ApiProperty()
  author: GetUserDto;

  @ApiProperty()
  comment: string;
}
