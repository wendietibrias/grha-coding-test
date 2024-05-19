import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterFileModule } from './providers/multer/multer.module';
import { DatabaseModule } from './providers/database/database.module';
import { JWTModule } from './providers/jwt/jwt.module';
import { CloudinaryModule } from './providers/cloudinary/cloudinary.module';
import { AuthModule, BooksModule, CategoriesModule } from './modules';
import configs from './common/configs';

@Module({
  imports: [
    ConfigModule.forRoot({
       isGlobal:true,
       load: configs
    }),
    DatabaseModule,
    JWTModule,
    CloudinaryModule,
    AuthModule,
    BooksModule,
    CategoriesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
