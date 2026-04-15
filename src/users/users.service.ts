import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/users.schema';
import { UsersRepository } from './users.repository';
import { UsersMapper } from './users.mapper';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly usersMapper: UsersMapper,
  ) {}

  async create(user: User) {
    return await this.userRepository.create(user);
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOneByEmail(email);
  }

  getUser(user: UserDocument) {
    return this.usersMapper.toGetUserDto(user);
  }
}
