import {
  Body,
  Post,
  Controller,
  Version,
  Get,
  Query,
  Delete,
  Param,
  Patch,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dto/createBookDTO';
import { GetBookDTO } from './dto/getBookDTO';
import { UpdateBookDTO } from './dto/updateBookDTO';
import { FileInterceptor } from '@nestjs/platform-express';
import {  imageFileFilter } from 'src/providers/multer/multer_validation.util';
import { AuthorizeGuard } from 'src/guards/authorize.guard';
import { User } from 'src/common/decorators/user.decorator';
import { IUserCredential } from 'src/interfaces/user_credential.interface';

@ApiBearerAuth('JWT')
@UseGuards(AuthorizeGuard)
@ApiTags('Book - Endpoint')
@Controller('api/book')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Version('1')
  @Get('all')
  async getAllBook(
    @Query() query: GetBookDTO ,
    @User() user: IUserCredential
) {
    return await this.bookService.getAllBook(query,user);
  }

  @Version('1')
  @Get('/:id')
  async getBookDetail(@Param('id') bookId: number) {
    return await this.bookService.getBookDetail(bookId);
  }

  @Version('1')
  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('cover',{
    fileFilter: imageFileFilter
  }))
  async createBook(
    @User() user: IUserCredential,
    @Body() body: CreateBookDTO,
    @UploadedFile() cover: Express.Multer.File,
 ) {
    return await this.bookService.createBook(body,cover,user);
  }

  @Version('1')
  @Delete('delete/:id')
  async deleteBook(@Param('id') bookId: number) {
    return await this.bookService.deleteBook(Number(bookId));
  }

  @Version('1')
  @Patch('update/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('cover',{
    fileFilter: imageFileFilter
  }))
  async updateBook(
    @Param('id') bookId: number,
    @Body() body: UpdateBookDTO,
    @UploadedFile() cover: Express.Multer.File | null
  ) {
    return await this.bookService.updateBook(bookId,body,cover);
  }
}
