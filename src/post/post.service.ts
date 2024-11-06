

import { ConflictException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { createPostDto, updatePostDto } from "src/dto/post.dto";
import { PostDocument, Posts } from "src/schema/post.schema";
import { User, UserDocument } from "src/schema/user.schema";

export class PostServices {
  constructor(
    @InjectModel(Posts.name) private postModel: Model<PostDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
) {}

  // Method to add a post
  async addPost(createPostDto: createPostDto): Promise<Posts> {
    const { author, title, content } = createPostDto; 

    const post = new this.postModel({title,content,author});

    await post.save();  // Save the new post to the database

    await this.userModel.findByIdAndUpdate(author,{
        $push:{
            posts:post._id
        }
    })
    return post;

  }

  // Method to get all posts
  async getPost(): Promise<Posts[]> {
    const posts=await this.postModel.find().populate('author');
    if( posts.length===0){
   throw new ConflictException('posts not found')
    }
    return posts;
  }

  // Method to update a post
  async updatePost(id: string, updatePostDto: updatePostDto): Promise<Posts> {
    const post = await this.postModel.findById(id);

    if (!post) {
      throw new NotFoundException('Post not found');  // Change from 'user' to 'post'
    }

    Object.assign(post, updatePostDto);
    return post.save();  // Save the updated post
  }

  // Method to delete a post
  async deletePost(id: string): Promise<Posts> {
    const post = await this.postModel.findById(id);

    if (!post) {
      throw new NotFoundException('Post not found');  // Ensure you check for the post before deleting
    }

    return await this.postModel.findByIdAndDelete(id); // Remove the post from the database
  }
}
