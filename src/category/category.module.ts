import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schemas/category.schema';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryMapper } from './category.mapper';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { PostsModule } from '../posts/posts.module';
import { EventModule } from '../event/event.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
    AuthModule,
    UsersModule,
    forwardRef(() => EventModule),
    forwardRef(() => PostsModule),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, CategoryMapper],
  exports: [CategoryMapper, CategoryService, CategoryRepository],
})
export class CategoryModule {}
