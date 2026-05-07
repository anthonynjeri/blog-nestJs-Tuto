import { ApiProperty } from '@nestjs/swagger';

export class GetLightUserDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
}
