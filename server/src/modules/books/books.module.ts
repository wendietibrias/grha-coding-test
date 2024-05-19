import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from 'src/entities/book.entity';
import { CategoryEntity } from 'src/entities/category.entity';
import { UserEntity } from 'src/entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/providers/cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, CategoryEntity, UserEntity])],
  controllers: [BooksController],
  providers: [BooksService, JwtService, CloudinaryService],
})
export class BooksModule {}
