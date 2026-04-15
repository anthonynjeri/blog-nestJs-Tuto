import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  title: string;

  @ApiProperty()
  @IsString()
  description: string;
}
