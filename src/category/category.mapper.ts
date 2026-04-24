import {
  CategoryDocument,
  CategoryEventDocument,
} from './schemas/category.schema';
import { GetCategoryDto } from './dto/response/get-category.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Types } from 'mongoose';
import { UsersMapper } from '../users/users.mapper';
import { GetCategoryLightDto } from './dto/response/get-category-light.dto';
import { PaginatedQueryDto } from '../_utils/dto/requests/paginated-query.dto';
import { GetCategoryPaginatedDto } from './dto/response/get-category-paginated.dto';
import { EventMapper } from '../event/event.mapper';
import { GetCategoryEventsDto } from './dto/response/get-category-events.dto';

@Injectable()
export class CategoryMapper {
  constructor(
    private usersMapper: UsersMapper,
    private eventsMapper: EventMapper,
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

  toGetCategoryEventsDto(
    category: CategoryEventDocument,
  ): GetCategoryEventsDto {
    if (category.author instanceof Types.ObjectId) {
      throw new InternalServerErrorException(
        "Author doesn't exist | not populated",
      );
    }

    category.likes.map((l) => console.log(l));
    return {
      id: category.id,
      title: category.title,
      likes: category.likes.map((like) =>
        this.eventsMapper.toGetLikeEventDto(like),
      ),
      comments: category.comments.map((comment) =>
        this.eventsMapper.toGetCommentEventDto(comment),
      ),
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
