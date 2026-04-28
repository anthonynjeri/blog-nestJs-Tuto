import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Likes } from './schemas/likes.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class LikesRepository {
  constructor(
    @InjectModel(Likes.name) private readonly likesModel: Model<Likes>,
  ) {}

  async likeACategory(catId: string, authorId: string) {
    return this.likesModel
      .create({
        category: new Types.ObjectId(catId),
        author: new Types.ObjectId(authorId),
      })
      .then((like) => like.populate(['category', 'author']))
      .then((like) => like.save());
  }

  async getLikes() {
    return this.likesModel.find().populate(['category', 'author']).exec();
  }

  async deleteLike(authorId: string, id: string) {
    return this.likesModel
      .findOneAndDelete({ _id: id, author: authorId })
      .orFail(new NotFoundException('Like or author not found'))
      .exec();
  }
}
