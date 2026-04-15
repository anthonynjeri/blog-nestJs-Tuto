import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import { AuthSignupDto } from './dto/request/auth-signup-dto';
import { AuthSigninDto } from './dto/request/auth-signin.dto';
import { UsersService } from '../users/users.service';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signUp(userSignUpDto: AuthSignupDto) {
    const user = await this.usersRepository.create(userSignUpDto);

    const payload = { sub: user.id, email: user.email };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(userSignInDto: AuthSigninDto) {
    const user = await this.usersRepository.findOneByEmail(userSignInDto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(userSignInDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Unauthorized login');
    }
    const payload = { sub: user.id, email: user.email };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: this.usersService.getUser(user),
    };
  }

  // async getProfile(email: string) {
  //   return this.usersRepository.findOneByEmail(email);
  // }
  async getProfile(email: string) {
    const user = await this.usersRepository.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return this.usersService.getUser(user);
  }
}
