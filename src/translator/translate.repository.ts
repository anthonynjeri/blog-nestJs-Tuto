import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

export interface TranslationType {
  text: string[];
  target_lang: string;
}
@Injectable()
export class TranslateRepository {
  constructor(private readonly httpService: HttpService) {}

  async getTextTranslation(title: string, description: string, lang: string) {
    const body: TranslationType = {
      text: [title, description],
      target_lang: lang,
    };

    const response = await this.httpService.axiosRef.post('/v2/translate', {
      ...body,
    });

    console.log(response.data?.translations);
    const translatedData = response.data?.translations;

    return {
      title: translatedData[0].text,
      description: translatedData[1].text,
    };
  }
}
