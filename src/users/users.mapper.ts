import { Injectable } from '@nestjs/common';
import { UserDocument } from './schemas/users.schema';
import { GetUserDto } from './_utils/dto/response/get-user-dto';
import { GetLightUserDto } from './_utils/dto/response/get-light-user.dto';

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

  toGetUserLightDto(user: UserDocument): GetLightUserDto {
    return {
      id: user.id,
      email: user.email,
      name: `${user.firstname} ${user.lastname}`,
    };
  }
}
