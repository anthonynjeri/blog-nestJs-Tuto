import { ApiProperty } from '@nestjs/swagger';
import { GetCategoryLightDto } from '../../../category/dto/response/get-category-light.dto';
import { GetUserDto } from '../../../users/_utils/dto/response/get-user-dto';
import { GetEventDto } from './get-event.dto';

export class LikeEventDto extends GetEventDto {
  @ApiProperty({
    enum: ['LikeEvent'],
  })
  declare kind: 'LikeEvent';
  @ApiProperty()
  category: GetCategoryLightDto;

  @ApiProperty()
  author: GetUserDto;
}
