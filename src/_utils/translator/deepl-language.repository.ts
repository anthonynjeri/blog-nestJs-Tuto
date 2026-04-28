import { Injectable } from '@nestjs/common';

import { DeeplLanguageClient } from './deepl-language.client';

@Injectable()
export class DeeplLanguageRepository {
  constructor(private deeplLanguageClient: DeeplLanguageClient) {}

  async getTextTranslated(text: string) {
    const result = await this.deeplLanguageClient.getTextTranslated(text);

    return result;
  }
}
