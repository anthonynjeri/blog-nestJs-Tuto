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
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import JwtPayloadInterface from './interfaces/jwt-payload.interface';

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

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  getProfile(@Request() req) {
    const { email }: JwtPayloadInterface = req.user as JwtPayloadInterface;
    return this.authService.getProfile(email);
  }
}
