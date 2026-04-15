import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthSigninDto {
  @ApiProperty({ description: 'email address', example: 'test@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({ description: 'password', example: '123password' })
  @IsNotEmpty()
  password: string;
}
