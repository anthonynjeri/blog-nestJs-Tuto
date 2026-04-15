import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthSignupDto {
  @ApiProperty({ description: 'Email', example: 'user-name@Example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({ description: 'First Name', example: 'John' })
  @IsNotEmpty()
  @IsString()
  firstname: string;
  @ApiProperty({ description: 'Last Name', example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  lastname: string;
  @ApiProperty({ description: 'Password', example: 'user-password' })
  @IsNotEmpty()
  password: string;
}
