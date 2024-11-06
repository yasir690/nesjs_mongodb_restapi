import { Body, Controller, Delete, Get, Param, Post, Put, Request } from "@nestjs/common";
import { UserService } from "./user.service";
import { createUserDto, loginUserDto, updateUserDto } from "src/dto/user.dto";
import { User } from "src/schema/user.schema";

@Controller('/user')
export class UserController{
constructor(private userservice:UserService){}
@Post('/adduser')
async adduser(@Body() createuserdto:createUserDto):Promise<User>{
return this.userservice.addUser(createuserdto);
}

@Post('/loginuser')
async loginuser(@Body() loginuserdto:loginUserDto):Promise<{ message: string, token: string }>{
    return this.userservice.loginUser(loginuserdto)
}

@Get('/getuser')
async getuser():Promise<User[]>{
return this.userservice.getUser();
}

@Put('/updateuser')
async updateUser(
    @Request() req: any,
    @Body() updateUserDto: updateUserDto,
  ) {
    const userId = req.user.userId;
    return await this.userservice.updateUser(userId, updateUserDto);
  }

  @Delete('/deleteuser')
  async deleteUser(
    @Request() req: any,
) {
    const userId = req.user.userId;
    return await this.userservice.deleteUser(userId);
  }
}