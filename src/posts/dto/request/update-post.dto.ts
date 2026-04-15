import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  title: string;

  @ApiProperty()
  @IsString()
  description: string;
}
