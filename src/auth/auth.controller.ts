import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSigninDto } from './dto/request/auth-signin.dto';
import { AuthSignupDto } from './dto/request/auth-signup-dto';
import { Public } from './constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  signUp(@Body() user: AuthSignupDto) {
    console.log(user);
    return this.authService.signUp(user);
  }

  @Public()
  @Post('login')
  signIn(@Body() user: AuthSigninDto) {
    return this.authService.signIn(user);
  }
}
