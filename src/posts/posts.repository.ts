import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/request/create-post.dto';
import { UpdatePostDto } from './dto/request/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { Model, QueryFilter, Types } from 'mongoose';
import { isNil } from '@nestjs/common/internal';
import { PostsPaginatedQueryDto } from './dto/request/posts-paginated-query.dto';

@Injectable()
export class PostsRepository {
  // private readonly posts: IPost[] = [];

  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async createPost(
    categoryId: string,
    authorId: string,
    createPostDto: CreatePostDto,
  ) {
    console.log(categoryId);
    console.log(createPostDto);
    const createdPost = new this.postModel({
      category: new Types.ObjectId(categoryId),
      title: createPostDto.title,
      description: createPostDto.description,
      author: new Types.ObjectId(authorId),
    });

    return createdPost.save();
  }

  // async findAllPosts() {
  //   return this.postModel
  //     .find()
  //     .populate({ path: 'category', populate: { path: 'author' } })
  //     .populate('author')
  //     .exec();
  // }
  async findPaginated(postsPaginatedQuery: PostsPaginatedQueryDto) {
    const query: QueryFilter<PostDocument> = {
      ...(!isNil(postsPaginatedQuery.search) &&
        ({
          $or: [
            { title: { $regex: postsPaginatedQuery.search, $options: 'i' } },
            {
              description: {
                $regex: postsPaginatedQuery.search,
                $options: 'i',
              },
            },
          ],
        } as QueryFilter<PostDocument>)),
    };

    const totalCount = await this.postModel.countDocuments(query);

    const results = await this.postModel
      .find(query)
      .sort(postsPaginatedQuery.toMongoDbSort)
      .skip(postsPaginatedQuery.skip)
      .limit(postsPaginatedQuery.limit)
      .exec();

    return {
      totalCount,
      results,
    };
  }

  async findPostsByCategory(categoryId: Types.ObjectId) {
    return this.postModel
      .find({ categoryId: categoryId })
      .populate('category')
      .populate('author')
      .exec();
  }

  async findPostById(id: string) {
    // return this.posts.find((post) => post.id === id);
    return this.postModel.findById(id).exec();
  }

  // async findIndexPostById(id: number): Promise<number> {
  //   return this.posts.findIndex((post) => post.id === id);
  // }
  async updatePost(id: string, updatePostDto: UpdatePostDto) {
    const updatedPost = this.postModel
      .findByIdAndUpdate(id, updatePostDto)
      .orFail(new NotFoundException('Could not find post with id ' + id))
      .exec();

    return updatedPost;
  }

  async deletePost(id: string) {
    // const post = this.posts.at(await this.findIndexPostById(id));
    // if (!post) throw new Error('Post not found');
    // this.posts.splice(await this.findIndexPostById(id), 1);
    //
    // return post;

    await this.postModel.findByIdAndDelete(id).exec();
  }
}
