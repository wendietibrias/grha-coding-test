import { ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary';

const CLOUDINARY = 'Cloudinary';

export const CloudinaryProvider = {
    provide: CLOUDINARY,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return v2.config({
        cloud_name: configService.get<string>('cloudinary.cloudName'),
        api_key: configService.get<string>('cloudinary.apiKey'),
        api_secret: configService.get<string>('cloudinary.apiSecret'),
      });
    },
  };