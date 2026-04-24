import { ApiProperty } from '@nestjs/swagger';
import { GetCategoryLightDto } from '../../../category/dto/response/get-category-light.dto';
import { GetUserDto } from '../../../users/dto/response/get-user-dto';

export class EventsBaseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  kind: string;

  @ApiProperty()
  category: GetCategoryLightDto;

  @ApiProperty()
  author: GetUserDto;
}
