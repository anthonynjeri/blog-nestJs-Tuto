import { CategoryDocument } from './schemas/category.schema';
import { GetCategoryDto } from './dto/response/get-category.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryMapper {
  toGetCategoryDto(category: CategoryDocument): GetCategoryDto {
    return {
      id: category.id,
      title: category.title,
      description: category.description,
    };
  }
}
