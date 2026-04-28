import { Module } from '@nestjs/common';
import { DeeplLanguageRepository } from './deepl-language.repository';
import { DeeplLanguageClient } from './deepl-language.client';
import { DeeplLanguageService } from './deepl-language.service';
import { DeepLClient } from 'deepl-node';

@Module({
  imports: [],
  providers: [
    DeeplLanguageService,
    DeeplLanguageRepository,
    DeeplLanguageClient,
    DeepLClient,
  ],
  exports: [DeeplLanguageService, DeeplLanguageRepository, DeeplLanguageClient],
})
export class DeeplLanguageModule {}
