import { ApiProperty } from '@nestjs/swagger';
import { GetCategoryLightDto } from '../../../category/dto/response/get-category-light.dto';
import { GetUserDto } from '../../../users/_utils/dto/response/get-user-dto';

export class GetLikesDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  category: GetCategoryLightDto;

  @ApiProperty()
  author: GetUserDto;
}
