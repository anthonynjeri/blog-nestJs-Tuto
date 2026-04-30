import { Injectable } from '@nestjs/common';
import { TranslateRepository } from './translate.repository';

@Injectable()
export class TranslateService {
  constructor(private translateRepository: TranslateRepository) {}

  // getTextTranslated(text: string) {
  //   const textResponse = this.translateRepository.getTextTranslation(text);
  //   console.log(textResponse);
  //   return textResponse;
  // }

  async getTextTranslation(title: string, description: string, lang: string) {
    return await this.translateRepository.getTextTranslation(
      title,
      description,
      lang,
    );
  }
}
