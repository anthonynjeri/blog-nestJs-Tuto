import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ description: 'user-id' })
  @IsNotEmpty()
  @IsString()
  id: string;
}
