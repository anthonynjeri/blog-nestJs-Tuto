import { DeepLClient } from 'deepl-node';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeeplLanguageClient {
  private authKey = '2de04f5d-9e61-45bc-8e53-fd6d69817aad:fx';
  private deeplClient: DeepLClient;
  constructor() {
    this.deeplClient = new DeepLClient(this.authKey);
  }

  async getTextTranslated(text: string) {
    const result = await this.deeplClient.translateText(text, null, 'fr');
    return result.text;
  }
}
