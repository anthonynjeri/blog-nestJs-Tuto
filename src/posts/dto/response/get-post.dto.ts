import { ApiProperty } from '@nestjs/swagger';
import { GetCategoryDto } from '../../../category/dto/response/get-category.dto';

export class GetPostDto {
  @ApiProperty({ description: 'Post ID', example: 'ejuhs9883geh75hrye' })
  id: string;
  @ApiProperty({ description: 'Category ID', example: 'ejuhs9883geh75hrye' })
  category: GetCategoryDto;
  @ApiProperty({ description: 'Post title', example: 'Welcome to my post' })
  title: string;
  @ApiProperty({ description: 'Post description', example: 'Post desc' })
  description: string;
}
