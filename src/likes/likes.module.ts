import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Likes, LikesSchema } from './schemas/likes.schema';
import { LikesRepository } from './likes.repository';
import { UsersModule } from '../users/users.module';
import { CategoryModule } from '../category/category.module';
import { LikesMapper } from './likes.mapper';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Likes.name,
        schema: LikesSchema,
      },
    ]),
    UsersModule,
    CategoryModule,
    AuthModule,
  ],
  controllers: [LikesController],
  providers: [LikesService, LikesRepository, LikesMapper],
  exports: [LikesRepository, LikesService, LikesMapper],
})
export class LikesModule {}
