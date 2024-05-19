import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/user.entity";

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity])],
    controllers:[AuthController],
    providers:[AuthService,JwtService],
    exports:[AuthService]
})
export class AuthModule{}