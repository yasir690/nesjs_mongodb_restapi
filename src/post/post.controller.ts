
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { createPostDto, updatePostDto } from "src/dto/post.dto";
import { Posts } from "src/schema/post.schema";
import { PostServices } from "./post.service";

@Controller('/post')
export class PostController {
  constructor(private postservice: PostServices) {}

  // POST route 
  @Post('/addpost')
  async addPost(@Body() createPostDto: createPostDto): Promise<Posts> {
    return this.postservice.addPost(createPostDto);
  }

  // GET route 
  @Get('/getpost')
  async getPost(): Promise<Posts[]> {
    return this.postservice.getPost();
  }

  // PUT route
  @Put('/updatepost/:id')
  async updatePost(@Param('id') id: string, @Body() updatePostDto: updatePostDto): Promise<Posts> {
    return this.postservice.updatePost(id, updatePostDto);
  }

  // DELETE route 
  @Delete('/deletepost/:id')
  async deletePost(@Param('id') id: string): Promise<Posts> {
    return this.postservice.deletePost(id);
  }
}
