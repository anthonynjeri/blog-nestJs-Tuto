import { ApiProperty } from '@nestjs/swagger';

export class GetCategoryLightDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
}
