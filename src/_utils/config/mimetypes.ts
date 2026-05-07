export enum MIME_TYPE {
  JPEG = 'image/jpeg',
  JPG = 'image/jpg',
  GIF = 'image/gif',
  SVG = 'image/svg+xml',
  WEBP = 'image/webp',
  PNG = 'image/png',
  PDF = 'application/pdf',
}

const IMAGES_MIME_TYPES = [
  MIME_TYPE.JPEG,
  MIME_TYPE.JPG,
  MIME_TYPE.PNG,
  MIME_TYPE.WEBP,
  MIME_TYPE.GIF,
  MIME_TYPE.SVG,
];

const DOCUMENT_MIME_TYPES = [MIME_TYPE.PDF];

export const ALLOW_MIME_TYPES = {
  IMAGES: IMAGES_MIME_TYPES,
  ATTACHMENTS: [...IMAGES_MIME_TYPES],
};
