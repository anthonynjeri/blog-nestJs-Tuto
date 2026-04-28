import { ApiProperty } from '@nestjs/swagger';
import { GetUserDto } from '../../../users/dto/response/get-user-dto';
import { GetPostsLightDto } from '../../../posts/dto/response/get-posts-light.dto';

export class GetCommentsDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  post: GetPostsLightDto;

  @ApiProperty()
  author: GetUserDto;
}
