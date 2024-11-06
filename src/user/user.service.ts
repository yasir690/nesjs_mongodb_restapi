import { ConflictException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { createUserDto, loginUserDto, updateUserDto } from "src/dto/user.dto";
import { User, UserDocument } from "src/schema/user.schema";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
export class UserService{
   
constructor(@InjectModel(User.name) private usermodel:Model<UserDocument>){}
    async addUser(createuserdto:createUserDto){

     const existuser=await this.usermodel.findOne({email:createuserdto.email});

          if(existuser){
        throw new ConflictException('user already exist')
     }

     // Hash the password before saving
    const hashedPassword = await bcrypt.hash(createuserdto.password, 10);


     // Create the new user with the hashed password
    const user = new this.usermodel({
        ...createuserdto,
        password: hashedPassword, // Store the hashed password
      });
// Save the user to the database
return user.save();  
    }
    
    async loginUser(loginuserdto:loginUserDto){
        const existuser=await this.usermodel.findOne({email:loginuserdto.email});
     
        if(!existuser){
           throw new NotFoundException('user not found')
        }

        // Step 2: Compare passwords using bcrypt
    const isPasswordValid = await bcrypt.compare(loginuserdto.password, existuser.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token=this.generateToken(existuser._id.toString());

    return {
        message:"user login successfully",
        token:token
    }
    }

      // Method to find a user by ID
  async findById(userId: string): Promise<User | null> {
    return this.usermodel.findById(userId).exec();
  }
    async getUser():Promise<User[]>{
      const users=await this.usermodel.find().populate('posts');
      if(users.length===0){
        throw new NotFoundException('users not found')
      }
      return users;
    }
    async updateUser(userId:string,updateuserdto:updateUserDto):Promise<User>{
       const user=await this.usermodel.findById(userId);
    //    if(!user){
    //     throw new NotFoundException(`User not found`);
    //    }
       Object.assign(user,updateuserdto);
       return user.save();
    }

    async deleteUser(userId:string){
        const user=await this.usermodel.findById(userId);
        if(!user){
         throw new NotFoundException(`User not found`);
        }
        return await this.usermodel.findByIdAndDelete(userId);
    }

    // Helper method to generate JWT token
  private generateToken(userId: string): string {
    const payload = { userId }; // You can add more data if needed
    const secret = process.env.JWT_SECRET;  // Add your JWT secret in .env
    const expiresIn = '1h';  // Set token expiration time (e.g., 1 hour)

    // Create and return the token
    return jwt.sign(payload, secret, { expiresIn });
  }
}