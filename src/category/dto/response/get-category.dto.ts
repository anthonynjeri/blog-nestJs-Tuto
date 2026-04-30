import { ApiProperty } from '@nestjs/swagger';
import { GetUserDto } from '../../../users/_utils/dto/response/get-user-dto';

export class GetCategoryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  author: GetUserDto;
}
