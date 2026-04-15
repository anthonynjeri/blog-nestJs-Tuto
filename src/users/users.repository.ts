import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: User) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);

    return this.userModel.create({
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      password: hash,
    });
  }

  async findOneByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
