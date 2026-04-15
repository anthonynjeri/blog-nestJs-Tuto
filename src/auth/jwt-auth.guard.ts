import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { UsersRepository } from '../users/users.repository';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly userRepository: UsersRepository,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // const request = context.switchToHttp().getRequest();
    // const token = this.extractTokenFromHeader(request);
    // if (!token) {
    //   throw new UnauthorizedException();
    // }

    try {
      // await this.jwtService.verifyAsync(token);
      // console.log(payload);
      return super.canActivate(context);
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
