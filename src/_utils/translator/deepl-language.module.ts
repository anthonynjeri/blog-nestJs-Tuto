import { Module } from '@nestjs/common';
import { DeeplLanguageRepository } from './deepl-language.repository';
import { DeeplLanguageClient } from './deepl-language.client';
import { DeeplLanguageService } from './deepl-language.service';

@Module({
  imports: [],
  providers: [
    DeeplLanguageService,
    DeeplLanguageRepository,
    DeeplLanguageClient,
  ],
  exports: [DeeplLanguageService, DeeplLanguageRepository, DeeplLanguageClient],
})
export class DeeplLanguageModule {}
