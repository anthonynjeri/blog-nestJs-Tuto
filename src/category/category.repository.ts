import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { Model, QueryFilter, Types } from 'mongoose';
import { CreateCategoryDto } from './dto/request/create-category.dto';
import { CategoryPaginatedQueryDto } from './dto/request/category-paginated-query.dto';
import { isNil } from '@nestjs/common/internal';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async createCategory(authorId: string, createCategoryDto: CreateCategoryDto) {
    const createdCategory = new this.categoryModel({
      title: createCategoryDto.title,
      description: createCategoryDto.description,
      author: new Types.ObjectId(authorId),
    });
    return await createdCategory.save();
  }

  async findAll() {
    const categories = this.categoryModel
      .find()
      .populate('author', '-password')
      .exec();

    return categories;
  }

  async findOne(id: string) {
    return this.categoryModel
      .findOne({ _id: id })
      .orFail(new NotFoundException('Category not found'))
      .populate('author')
      .exec();
  }

  async findPaginated(categoryPaginatedQuery: CategoryPaginatedQueryDto) {
    const query: QueryFilter<CategoryDocument> = {
      ...(!isNil(categoryPaginatedQuery.search) &&
        ({
          $or: [
            { title: { $regex: categoryPaginatedQuery.search, $options: 'i' } },
            {
              description: {
                $regex: categoryPaginatedQuery.search,
                $options: 'i',
              },
            },
          ],
        } as QueryFilter<CategoryDocument>)),
    };
    console.log(query);
    const totalCount = await this.categoryModel.countDocuments(query);

    const results = await this.categoryModel
      .find(query)
      .sort(categoryPaginatedQuery.toMongoDbSort)
      .skip(categoryPaginatedQuery.skip)
      .limit(categoryPaginatedQuery.limit)
      .exec();

    return { totalCount, results };
  }

  // async delete() {
  //   return this.categoryModel.deleteMany().exec();
  // }
}
