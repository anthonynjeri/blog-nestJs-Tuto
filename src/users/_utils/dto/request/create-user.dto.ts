import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Email', example: 'admin@Example.com' })
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
  @ApiProperty({ description: 'Password', example: 'Password123*' })
  @IsNotEmpty()
  password: string;
}
