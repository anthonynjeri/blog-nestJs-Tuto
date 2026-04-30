import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthSigninDto {
  @ApiProperty({ description: 'email address', example: 'toni@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({ description: 'password', example: 'password' })
  @IsNotEmpty()
  password: string;
}
