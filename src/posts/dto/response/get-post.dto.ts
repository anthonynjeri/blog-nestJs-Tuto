import { ApiProperty } from '@nestjs/swagger';
import { GetUserDto } from '../../../users/dto/response/get-user-dto';
import { GetCategoryLightDto } from '../../../category/dto/response/get-category-light.dto';

export class GetPostDto {
  @ApiProperty({ description: 'Post ID', example: 'ejuhs9883geh75hrye' })
  id: string;
  @ApiProperty({ description: 'Category ID', example: 'ejuhs9883geh75hrye' })
  category: GetCategoryLightDto;
  @ApiProperty({ description: 'Post title', example: 'Welcome to my post' })
  title: string;
  @ApiProperty({ description: 'Post description', example: 'Post desc' })
  description: string;
  @ApiProperty({
    description: 'Author of post',
    example: '{id:"",firstname:"",lastname:""}',
  })
  author: GetUserDto;
}
