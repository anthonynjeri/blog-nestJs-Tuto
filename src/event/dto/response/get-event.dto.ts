import { ApiProperty } from '@nestjs/swagger';

export class GetEventDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  kind: string;

  @ApiProperty()
  createdAt: Date;
}
