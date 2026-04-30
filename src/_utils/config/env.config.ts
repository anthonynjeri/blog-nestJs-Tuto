import { IsNumber, IsString, validateSync } from 'class-validator';
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
