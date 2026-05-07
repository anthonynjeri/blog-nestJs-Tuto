import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { HasMimeType, IsFile, MaxFileSize, MetaSource } from 'nestjs-form-data';

export function IsImageUpload(options: ApiPropertyOptions = {}) {
  return applyDecorators(
    IsFile(),
    MaxFileSize(1e6),
    HasMimeType(
      ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'],
      MetaSource.bufferMagicNumber,
    ),
    ApiProperty({
      type: 'string',
      format: 'binary',
      ...options,
    }),
  );
}
