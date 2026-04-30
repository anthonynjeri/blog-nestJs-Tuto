import { CategoryDocument } from './schemas/category.schema';
import { GetCategoryDto } from './dto/response/get-category.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Types } from 'mongoose';
import { UsersMapper } from '../users/users.mapper';
import { GetCategoryLightDto } from './dto/response/get-category-light.dto';
import { PaginatedQueryDto } from '../_utils/dto/requests/paginated-query.dto';
import { GetCategoryPaginatedDto } from './dto/response/get-category-paginated.dto';
import { TranslateService } from '../translator/translate.service';

@Injectable()
export class CategoryMapper {
  constructor(
    private usersMapper: UsersMapper,
    private deeplLanguageService: TranslateService,
  ) {}
  toGetCategoryDto(category: CategoryDocument): GetCategoryDto {
    console.log(category);
    if (category.author instanceof Types.ObjectId) {
      throw new InternalServerErrorException(
        "Author doesn't exist | not populated",
      );
    }

    return {
      id: category.id,
      title: category.title,
      description: category.description,
      author: this.usersMapper.toGetUserDto(category.author),
    };
  }

  // async toGetTranslatedCategoryDto(
  //   category: CategoryDocument,
  // ): Promise<GetCategoryDto> {
  //   console.log(category);
  //   if (category.author instanceof Types.ObjectId) {
  //     throw new InternalServerErrorException(
  //       "Author doesn't exist | not populated",
  //     );
  //   }
  //
  //   const translatedTitle = await this.deeplLanguageService.getTextTranslated(
  //     category.title,
  //   );
  //   const translatedDescription =
  //     await this.deeplLanguageService.getTextTranslated(category.description);
  //
  //   return {
  //     id: category.id,
  //     title: translatedTitle,
  //     description: translatedDescription,
  //     author: this.usersMapper.toGetUserDto(category.author),
  //   };
  // }

  toGetCategoryLightDto(category: CategoryDocument): GetCategoryLightDto {
    console.log(category);
    return {
      id: category._id.toString(),
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
      categories.map((c) => this.toGetLightCategoryNoAuthorDto(c)),
      paginatedQuery,
      totalCount,
    );
  }
}
