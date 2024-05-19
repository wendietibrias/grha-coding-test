import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from './dto/createCategoryDTO';
import catchErrorHandling from 'src/common/helpers/catchErrorHandling';
import { UpdateCategoryDTO } from './dto/updateCategoryDTO';
import { IUserCredential } from 'src/interfaces/user_credential.interface';
import { UserEntity } from 'src/entities/user.entity';
import { GetCategoryDTO } from './dto/GetCategoryDTO';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryEntity: Repository<CategoryEntity>,
    @InjectRepository(UserEntity) private readonly userEntity: Repository<UserEntity>
  ) {}

  async getCategoryForSelectOption(user: IUserCredential) {
     try {
       const allCategoryItems = await this.categoryEntity.findBy({
          user: {
             id: user.id 
          }
       });

       return allCategoryItems;

     } catch(err) {
        return catchErrorHandling(err);
     }
  }

  async getAllCategory(query: GetCategoryDTO, user: IUserCredential) {
    try {
      const { page,per_page } = query;

      const totalItems = await this.categoryEntity.countBy({
        user: {
          id: user.id
        }
      });

      let pageNum=Number(page);
      let perPageNum = Number(per_page);
      let totalPage = totalItems < 10 ? 1 : Math.ceil(totalItems / perPageNum);
      let skipItemCount = pageNum < 2 ? 0 : perPageNum * (pageNum-1);

      const findCategory = await this.categoryEntity.find({
          take: perPageNum,
          skip: skipItemCount,
          where: {
            user: {
              id: user.id
            }
          }
      });

      return {
         message:'success get categories',
         data: {
            totalPage,
            totalItems,
            nextPage: pageNum < totalPage ? (pageNum+1) : null,
            items: findCategory
         }
      };
    } catch (err) {
      return catchErrorHandling(err);
    }
  }

  async createCategory(body: CreateCategoryDTO,user: IUserCredential) {
    try {
      const { category_title } = body;

      const findUser = await this.userEntity.findOneBy({ id:user.id });

      const category = new CategoryEntity();

      category.category_title = category_title;
      category.user = findUser;

      const createCategory = await this.categoryEntity.save(category);

      if (createCategory) {
        return {
          message: 'success add category',
          status: 'success',
          data: createCategory,
        };
      }
    } catch (err) {
      return catchErrorHandling(err);
    }
  }

  async deleteCategory(categoryId: number) {
    try {
      const findCategoryById = await this.categoryEntity.findOneBy({
         id: categoryId
      });
 
      if(!findCategoryById) {
         throw new NotFoundException("Category not found");
      }

      const deleteCategory = await this.categoryEntity.delete({
        id: categoryId,
      });

      if (deleteCategory) {
        return {
          message: 'success delete category',
          status: 'success',
        };
      }
    } catch (err) {
      return catchErrorHandling(err);
    }
  }
}
