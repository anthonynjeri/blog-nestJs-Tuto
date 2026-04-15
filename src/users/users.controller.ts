import { Body, Controller, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/request/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('signup')
  signUp(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Post('login')
  signIn(@Body() user: CreateUserDto) {
    return this.usersService.findOneByEmail(user.email);
  }
}
