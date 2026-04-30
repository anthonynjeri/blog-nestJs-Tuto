import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/post.schema';
import { PostsMapper } from './posts.mapper';
import { CategoryModule } from '../category/category.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { EventModule } from '../event/event.module';
import { TranslateModule } from '../translator/translate.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    CategoryModule,
    AuthModule,
    UsersModule,
    EventModule,
    TranslateModule,
    CacheModule.register(),
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository, PostsMapper],
  exports: [PostsService, PostsRepository, PostsMapper],
})
export class PostsModule {}
