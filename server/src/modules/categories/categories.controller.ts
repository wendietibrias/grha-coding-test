import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDTO } from './dto/createCategoryDTO';
import { CategoriesService } from './categories.service';
import { UpdateCategoryDTO } from './dto/updateCategoryDTO';
import { AuthorizeGuard } from 'src/guards/authorize.guard';
import { User } from 'src/common/decorators/user.decorator';
import { IUserCredential } from 'src/interfaces/user_credential.interface';
import { GetCategoryDTO } from './dto/GetCategoryDTO';

@UseGuards(AuthorizeGuard)
@ApiBearerAuth('JWT')
@ApiTags('Category - Endpoint')
@Controller('api/category')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get('select-option')
  @Version('1')
  async getCategoryForSelectOption(@User() user: IUserCredential) {
     return await this.categoryService.getCategoryForSelectOption(user);
  }

  @Get('all')
  @Version('1')
  async getAllCategory(@Query() query: GetCategoryDTO,@User() user: IUserCredential) {
    return await this.categoryService.getAllCategory(query,user);
  }

  @Post('create')
  @Version('1')
  async createCategory(@Body() body: CreateCategoryDTO,@User() user: IUserCredential) {
    return await this.categoryService.createCategory(body,user);
  }


  @Delete('delete/:id')
  @Version('1')
  async deleteCategory(@Param('id') categoryId: number) {
    return await this.categoryService.deleteCategory(categoryId);
  }
}
