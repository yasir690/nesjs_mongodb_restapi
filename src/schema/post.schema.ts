import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document,Schema as MongooseSchema } from "mongoose";
import { User } from "./user.schema";

@Schema()
export class Posts extends Document{

    @Prop({required:true})
    title:string;

    @Prop({required:true})
    content:string;

    @Prop({type: MongooseSchema.Types.ObjectId, ref: 'User' })
    author:User;

    @Prop({ default: Date.now })
  createdAt: Date;
}

export type PostDocument=Posts & Document;

export const PostSchema=SchemaFactory.createForClass(Posts);