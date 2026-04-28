import { Injectable } from '@nestjs/common';
import { DeeplLanguageRepository } from './deepl-language.repository';

@Injectable()
export class DeeplLanguageService {
  constructor(private deeplLanguageRepository: DeeplLanguageRepository) {}

  getTextTranslated(text: string) {
    return this.deeplLanguageRepository.getTextTranslated(
      text,
    ) as unknown as string;
  }
}
