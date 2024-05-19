import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
    imports:[
        JwtModule.registerAsync({
            inject:[ConfigService],
            useFactory: (configService: ConfigService)=>({
                secret: configService.get<string>('jwt.secret'),
                signOptions:{ 
                    expiresIn: configService.get<string>('jwt.expired')
                },
                global:true
            })
        })
    ],
})
export class JWTModule{}