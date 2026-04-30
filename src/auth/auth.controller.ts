import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSigninDto } from './_utils/dto/request/auth-signin.dto';
import { AuthSignupDto } from './_utils/dto/request/auth-signup-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() user: AuthSignupDto) {
    console.log(user);
    return this.authService.signUp(user);
  }

  @Post('login')
  signIn(@Body() user: AuthSigninDto) {
    return this.authService.signIn(user);
  }
}
