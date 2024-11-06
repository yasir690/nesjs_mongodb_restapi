import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document,Schema as MongooseSchema } from "mongoose";
import {  Posts } from "./post.schema";


@Schema()
export class User extends Document{

    @Prop({required:true})
    name:string;

    @Prop({required:true,unique:true})
    email:string;

    @Prop({required:true})
    password:string;

    @Prop({type:[{ type: MongooseSchema.Types.ObjectId, ref: 'Posts' }]})
    posts:Posts[]


  @Prop({ default: Date.now })
  createdAt: Date;
}

// Define and export the UserDocument type (which combines User and Mongoose's Document)
export type UserDocument=User & Document;

export const UserSchema=SchemaFactory.createForClass(User);

