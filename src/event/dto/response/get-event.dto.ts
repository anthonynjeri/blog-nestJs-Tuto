import { ApiProperty } from '@nestjs/swagger';
import { GetUserDto } from '../../../users/dto/response/get-user-dto';
import { GetCategoryLightDto } from '../../../category/dto/response/get-category-light.dto';

export class GetEventDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  kind: string;

  @ApiProperty()
  category: GetCategoryLightDto;

  @ApiProperty()
  author: GetUserDto;

  @ApiProperty()
  comment?: string;
}
