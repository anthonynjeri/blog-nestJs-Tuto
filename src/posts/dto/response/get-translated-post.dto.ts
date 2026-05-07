import { ApiProperty } from '@nestjs/swagger';
import { GetCategoryLightDto } from '../../../category/dto/response/get-category-light.dto';
import { GetLightUserDto } from '../../../users/_utils/dto/response/get-light-user.dto';

export class GetTranslatedPostDto {
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
  author: GetLightUserDto;
  @ApiProperty({
    description: 'language translations',
    example: "fr:{title:'Bonjour', description:'Bonjour'}",
  })
  translations?: {
    lang: string;
    translation?: { title: string; description: string };
  };
}
