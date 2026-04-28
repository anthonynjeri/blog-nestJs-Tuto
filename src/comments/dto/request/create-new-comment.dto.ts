import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNewCommentDto {
  @ApiProperty({
    description: 'Contents of the comment',
    example: 'I am a comment on some post ',
  })
  @IsNotEmpty()
  @IsString()
  comment: string;
}
