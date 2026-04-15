import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/request/create-post.dto';
import { UpdatePostDto } from './dto/request/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class PostsRepository {
  // private readonly posts: IPost[] = [];

  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async createPost(categoryId: string, createPostDto: CreatePostDto) {
    console.log(categoryId);
    console.log(createPostDto);
    const createdPost = new this.postModel({
      category: new Types.ObjectId(categoryId),
      title: createPostDto.title,
      description: createPostDto.description,
    });

    return (await createdPost.save()).populate('category');
  }

  async findAllPosts() {
    return this.postModel.find().populate('category').exec();
  }

  async findPostsByCategory(categoryId: Types.ObjectId) {
    return this.postModel
      .find({ categoryId: categoryId })
      .populate('category')
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
