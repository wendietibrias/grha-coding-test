import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";

@Module({
    imports:[
        MulterModule.registerAsync({
             inject: [ConfigService],
             useFactory: (configService: ConfigService) => ({
                 dest: configService.get<string>('multer.dest')
             })
        })
    ],
})
export class MulterFileModule{}