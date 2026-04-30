import { forwardRef, Module } from '@nestjs/common';
import { TranslateRepository } from './translate.repository';
import { TranslateService } from './translate.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../_utils/config/env.config';
import { TranslateController } from '././translate.controller';
import { PostsModule } from '../posts/posts.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService<EnvironmentVariables, true>,
      ) => ({
        baseURL: configService.get<string>('DEEPL_URL'),
        headers: {
          Authorization: `DeepL-Auth-Key ${configService.get<string>('DEEPL_AUTH_KEY')}`,
          'Content-Type': 'application/json',
        },
      }),
    }),
    forwardRef(() => PostsModule),
    AuthModule,
    UsersModule,
  ],
  providers: [TranslateService, TranslateRepository, TranslateController],
  exports: [TranslateService, TranslateRepository],
  controllers: [TranslateController],
})
export class TranslateModule {}
