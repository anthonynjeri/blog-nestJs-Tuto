import { IsNumber, IsOptional, IsString, validateSync } from 'class-validator';
import { exit } from 'process';
import { Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

export class EnvironmentVariables {
  @IsString()
  DEEPL_URL: string;

  @IsString()
  DEEPL_AUTH_KEY: string;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  MONGODB_URL: string;

  @IsString()
  JWT_EXPIRATION: string;

  @IsNumber()
  PORT: number;

  @IsString()
  RUSTFS_ENDPOINT: string;

  @IsOptional()
  @IsNumber()
  RUSTFS_PORT?: number;

  @IsString()
  RUSTFS_ACCESS_KEY: string;

  @IsString()
  RUSTFS_SECRET_KEY: string;

  @IsString()
  RUSTFS_BUCKET_NAME: string;

  @IsString()
  RUSTFS_REGION: string;

  @IsNumber()
  UPLOAD_MAX_FILES: number;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length) {
    new Logger(validateEnv.name).error(errors.toString());
    exit();
  }
  return validatedConfig;
}
