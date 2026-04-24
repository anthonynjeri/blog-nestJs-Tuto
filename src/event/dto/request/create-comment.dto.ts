import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment here',
    example: 'this is a comment',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  comment: string;
}
