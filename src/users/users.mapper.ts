import { Injectable } from '@nestjs/common';
import { UserDocument } from './schemas/users.schema';
import { GetUserDto } from './dto/response/get-user-dto';

@Injectable()
export class UsersMapper {
  toGetUserDto(user: UserDocument): GetUserDto {
    return {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    };
  }
}
