import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MemoryStoredFile } from 'nestjs-form-data';
import { IsImageUpload } from '../../../_utils/decorators/is-image-file.decorator';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @IsOptional()
  @IsImageUpload({ description: 'Image for the post' })
  postImage?: MemoryStoredFile;
}
