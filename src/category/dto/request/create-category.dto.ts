import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Post } from '../../../posts/schemas/post.schema';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Title of the category',
    example: 'Random Stuff',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description of the category',
    example: 'Category Description',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  // @ApiProperty({ description: 'Author of the category', example: 'John Doe' })
  // @IsString()
  // @IsNotEmpty()
  // author: string;
}
