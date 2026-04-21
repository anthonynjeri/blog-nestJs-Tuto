import { CategoryDocument } from './schemas/category.schema';
import { GetCategoryDto } from './dto/response/get-category.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Types } from 'mongoose';
import { UsersMapper } from '../users/users.mapper';
import { GetCategoryLightDto } from './dto/response/get-category-light.dto';
import { PaginatedQueryDto } from '../_utils/dto/requests/paginated-query.dto';
import { GetCategoryPaginatedDto } from './dto/response/get-category-paginated.dto';

@Injectable()
export class CategoryMapper {
  constructor(private usersMapper: UsersMapper) {}
  toGetCategoryDto(category: CategoryDocument): GetCategoryDto {
    if (category.author instanceof Types.ObjectId) {
      throw new InternalServerErrorException("Author doesn't exist");
    }

    return {
      id: category.id,
      title: category.title,
      description: category.description,
      author: this.usersMapper.toGetUserDto(category.author),
    };
  }

  toGetCategoryLightDto(category: CategoryDocument): GetCategoryLightDto {
    if (category.author instanceof Types.ObjectId) {
      throw new InternalServerErrorException("Author doesn't exist");
    }
    return {
      id: category.id,
      title: category.title,
    };
  }

  toGetLightCategoryNoAuthorDto(
    category: CategoryDocument,
  ): GetCategoryLightDto {
    return {
      id: category.id,
      title: category.title,
    };
  }

  toGetCategoriesPaginatedDto(
    paginatedQuery: PaginatedQueryDto,
    categories: CategoryDocument[],
    totalCount: number,
  ) {
    return new GetCategoryPaginatedDto(
      // categories.map(this.toGetLightCategoryNoAuthorDto.bind(this)),
      categories.map((c) => this.toGetLightCategoryNoAuthorDto(c)),
      paginatedQuery,
      totalCount,
    );
  }
}
