import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { ConnectedUser } from './_utils/decorator/connected-user.decorator';
import { Protect } from '../auth/_utils/decorator/protect.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Protect()
  @Get('profile')
  getProfile(@ConnectedUser() user) {
    console.log(user);
    return this.usersService.getUser(user);
  }
}
