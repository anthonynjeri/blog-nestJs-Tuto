import { MemoryStoredFile } from 'nestjs-form-data';
import { extname } from 'path';

export class StorageClientMapper {
  static getImageKey(userId: string, image: MemoryStoredFile) {
    const extension = extname(image.originalName);
    const name = image.originalName.replace(extension, '');

    return `${userId}/${name}-${Date.now()}${extension}`;
  }

  static createUrlImage(key: string, baseUrl: string, bucket: string) {
    if (key) {
      return `${baseUrl}/${bucket}/${key}`;
    } else {
      return '';
    }
  }

  static extractKeyFromUrl(url: string) {
    return url.split('/').slice(4).join('/');
  }
}
