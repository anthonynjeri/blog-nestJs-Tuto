import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSigninDto } from './dto/request/auth-signin.dto';
import { AuthSignupDto } from './dto/request/auth-signup-dto';
import { Public } from './constants';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

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

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  getProfile(@Request() req) {
    console.log(req.user);
    return this.authService.getProfileOnGuard(req.user);
  }
}
