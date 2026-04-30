import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import ValidationPipeOptionsConfig from './_utils/config/validation-pipe-options.config';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './_utils/config/env.config';
import { useContainer } from 'class-validator';
import SwaggerCustomOptionsConfig from './_utils/config/swagger-custom-options.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app
    .setGlobalPrefix('blog-api/v1')
    .useGlobalPipes(new ValidationPipe(ValidationPipeOptionsConfig))
    .enableCors();
  const config = new DocumentBuilder()
    .setTitle('Reddit Blog')
    .setDescription('The reddit blog API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document, SwaggerCustomOptionsConfig);

  const configService = app.get(ConfigService<EnvironmentVariables, true>);

  return app.listen(configService.get('PORT'));
}
bootstrap();
