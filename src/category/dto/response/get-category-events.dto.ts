import { ApiProperty } from '@nestjs/swagger';
import { LikeEventDto } from '../../../event/dto/response/like-event.dto';
import { CommentEventDto } from '../../../event/dto/response/comment-event.dto';
import { GetUserDto } from '../../../users/dto/response/get-user-dto';

export class GetCategoryEventsDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  likes: LikeEventDto[];
  @ApiProperty()
  comments: CommentEventDto[];
  @ApiProperty()
  author: GetUserDto;
}
