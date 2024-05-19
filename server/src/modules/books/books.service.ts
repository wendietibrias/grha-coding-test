import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/entities/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDTO } from './dto/createBookDTO';
import catchErrorHandling from 'src/common/helpers/catchErrorHandling';
import { GetBookDTO } from './dto/getBookDTO';
import { UpdateBookDTO } from './dto/updateBookDTO';
import { CategoryEntity } from 'src/entities/category.entity';
import { CloudinaryService } from 'src/providers/cloudinary/cloudinary.service';
import { UserEntity } from 'src/entities/user.entity';
import { IUserCredential } from 'src/interfaces/user_credential.interface';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookEntity: Repository<BookEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryEntity: Repository<CategoryEntity>,
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async getAllBook(query: GetBookDTO, user: IUserCredential) {
    try {
      const { page, per_page } = query;
      const totalItems = await this.bookEntity.countBy({
        user: {
          id: user.id,
        },
      });

      let pageNum = Number(page);
      let perPageNum = Number(per_page);

      let totalPage = Math.ceil(totalItems / perPageNum);
      let skipItemCount = pageNum < 2 ? 0 : perPageNum * (pageNum - 1);

      const findAllBook = await this.bookEntity.find({
        take: perPageNum,
        skip: skipItemCount,
        where:{
          user: {
            id: user.id
          }
        }
      });

      return {
        status:'success',
        totalItems,
        data: {
          totalPage,
          nextPage: pageNum < totalPage ? (pageNum+1):null,
          items: findAllBook,
        },
      };
    } catch (err) {
      return catchErrorHandling(err);
    }
  }

  async getBookDetail(bookId:number) {
     try {
       const findBookById = await this.bookEntity.findOneBy({
          id: bookId 
       });

       return {
         message:'success find book with title : ' + findBookById.title,
         status:'success',
         data: findBookById
       }
       
     } catch(err){
       return catchErrorHandling(err);
     }
  }

  async detailBook() {
    try {
    } catch (err) {
      return catchErrorHandling(err);
    }
  }

  async createBook(
    body: CreateBookDTO,
    cover: Express.Multer.File,
    user: IUserCredential,
  ) {
    try {
      const {
        title,
        author,
        total_page,
        publisher,
        release_date,
        language,
        description,
        isbn,
        category,
      } = body;

      const book = new BookEntity();
      const findUser = await this.userEntity.findOneBy({ id: user.id });

      //upload image first
      const uploadCover: any = await this.cloudinaryService.uploadImageHandler(
        cover,
        'covers',
      );

      if (uploadCover) {
        book.title = title;
        book.author = author;
        book.total_page = total_page;
        book.release_date = release_date;
        book.language = language;
        book.description = description;
        book.publisher = publisher;
        book.isbn = isbn;
        book.category = category;
        book.cover_url = uploadCover.secure_url;
        book.cover_id = uploadCover.public_id;
        book.user = findUser;

        const createBook = await this.bookEntity.save(book);

        if (createBook) {
          return {
            message: 'success add new book',
            status: 'success',
            data: createBook,
          };
        }
      }

      throw new InternalServerErrorException(
        'Something went wrong.. please try again',
      );
    } catch (err) {
      return catchErrorHandling(err);
    }
  }

  async deleteBook(bookId: number) {
    try {
      const findBook = await this.bookEntity.findOneBy({ id:bookId });
      const deleteCoverBook = await this.cloudinaryService.destroyImageHandler(
        findBook.cover_id,
      );

      if (deleteCoverBook) {
        const deleteBook = await this.bookEntity.delete({
          id:bookId,
        });

        if (deleteBook) {
          return {
            message: 'success remove a book',
            status: 'success',
          };
        }
      }
    } catch (err) {
      return catchErrorHandling(err);
    }
  }

  async updateBook(
    bookId: number,
    body: UpdateBookDTO,
    cover: Express.Multer.File | null,
  ) {
    try {
      const {
        title,
        author,
        total_page,
        publisher,
        release_date,
        language,
        description,
        isbn,
        category,
        old_cover_id,
      } = body;

      //throw an error if a book not exist
      const findBookById = await this.bookEntity.findOneBy({ id:bookId });
      if (!findBookById) {
        throw new NotFoundException(`Book not found`);
      }

      //if the cover (file) is exist, then we need to remove previously image on the cloud
      let uploadCover: any;
      if (cover) {
        await this.cloudinaryService.destroyImageHandler(old_cover_id);
        uploadCover = await this.cloudinaryService.uploadImageHandler(
          cover,
          'covers',
        );
      }

      const updateBook = await this.bookEntity.update({
         id:bookId
      }, {
         title: title ?? findBookById.title,
         isbn: isbn ?? findBookById.isbn,
         author: author ?? findBookById.author,
         description: description ?? findBookById.description,
         release_date: release_date ?? findBookById.release_date,
         total_page: total_page ?? findBookById.total_page,
         cover_id: uploadCover?.public_id ? uploadCover.public_id : findBookById.cover_id,
         cover_url: uploadCover?.secure_url ? uploadCover.secure_url : findBookById.cover_url,
         category: category ?? findBookById.category,
         language: language ?? findBookById.language,
         publisher: publisher ?? findBookById.publisher
      });

      if (updateBook) {
        return {
          message: 'success update book',
          status: 'success',
          data: updateBook,
        };
      }
    } catch (err) {
      return catchErrorHandling(err);
    }
  }
}
