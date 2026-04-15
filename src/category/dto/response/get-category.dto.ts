import { ApiProperty } from '@nestjs/swagger';

export class GetCategoryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}
