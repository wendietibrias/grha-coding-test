import { Module } from "@nestjs/common";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "src/entities/category.entity";
import { UserEntity } from "src/entities/user.entity";
import { BookEntity } from "src/entities/book.entity";
import { AuthService } from "../auth/auth.service";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports:[TypeOrmModule.forFeature([CategoryEntity,BookEntity,UserEntity])],
    controllers:[CategoriesController],
    providers:[CategoriesService,JwtService]
})
export class CategoriesModule {}