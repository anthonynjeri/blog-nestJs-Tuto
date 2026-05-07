import { Logger, Provider } from '@nestjs/common';
import {
  CreateBucketCommand,
  HeadBucketCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../_utils/config/env.config';

export const StorageProvider: Provider[] = [
  {
    provide: S3Client,
    useFactory: async (
      configService: ConfigService<EnvironmentVariables, true>,
    ) => {
      const logger = new Logger('StorageProvider');
      const bucketName = configService.get<string>('RUSTFS_BUCKET_NAME');

      const endPoint = configService.get<string>('RUSTFS_ENDPOINT');
      const accessKey = configService.get<string>('RUSTFS_ACCESS_KEY');
      const secretKey = configService.get<string>('RUSTFS_SECRET_KEY');
      const region = configService.get<string>('RUSTFS_REGION');

      const cleanEndpoint = endPoint.replace(/;+$/, '');
      const s3Client = new S3Client({
        endpoint: cleanEndpoint,
        region: region,
        credentials: {
          accessKeyId: accessKey,
          secretAccessKey: secretKey,
        },
        forcePathStyle: true,
        logger: console,
      });
      logger.log(`StorageProvider initialized for endpoint: ${endPoint}`);
      try {
        logger.log(`Attempting to ensure bucket "${bucketName}" exists...`);

        await s3Client.send(new CreateBucketCommand({ Bucket: bucketName }));
        logger.log(`Bucket "${bucketName}" created.`);
      } catch (error: any) {
        if (
          error.name === 'BucketAlreadyOwnedByYou' ||
          error.name === 'BucketAlreadyExists'
        ) {
          logger.log(`Bucket "${bucketName}" already exists and is ready.`);
        } else {
          logger.warn(
            `Could not verify bucket "${bucketName}", but proceeding anyway. Error: ${error.message}`,
          );
        }
      }
      return s3Client;
    },
    inject: [ConfigService],
  },
];
