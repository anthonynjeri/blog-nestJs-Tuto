import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './comments.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Comments, CommentsSchema } from './schemas/comments.schema';
import { UsersModule } from '../users/users.module';
import { PostsModule } from '../posts/posts.module';
import { CommentsMapper } from './comments.mapper';
import { AuthModule } from '../auth/auth.module';
import { TranslateModule } from '../translator/translate.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Comments.name,
        schema: CommentsSchema,
      },
    ]),
    UsersModule,
    PostsModule,
    AuthModule,
    TranslateModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository, CommentsMapper],
  exports: [CommentsService, CommentsRepository, CommentsMapper],
})
export class CommentsModule {}
