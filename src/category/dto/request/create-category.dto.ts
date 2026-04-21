import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
