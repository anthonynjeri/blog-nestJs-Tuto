import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostCommentDto {
  @ApiProperty({
    description: 'Contents of the comment',
    example: 'I am a comment on some post ',
  })
  @IsNotEmpty()
  @IsString()
  comment: string;
}
