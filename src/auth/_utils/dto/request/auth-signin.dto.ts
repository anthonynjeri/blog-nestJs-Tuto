import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthSigninDto {
  @ApiProperty({ description: 'email address', example: 'admin@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({ description: 'password', example: 'Password123*' })
  @IsNotEmpty()
  password: string;
}
