import { MongooseModule } from "@nestjs/mongoose";
import { Posts, PostSchema } from "src/schema/post.schema";
import { PostServices } from "./post.service";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { PostController } from "./post.controller";
import { AuthMiddleware } from "src/middleware/auth";

@Module({
    imports: [
      MongooseModule.forFeature([{ name: Posts.name, schema: PostSchema }]), // Register Post model
    ],
    providers: [PostServices],
    controllers: [PostController], // If you have a controller
    exports: [PostServices], // If you need to use PostService in other modules
  })
  export class PostsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // Apply middleware to all routes in UserController
        consumer
          .apply(AuthMiddleware)
          .forRoutes(PostController);  // Apply middleware to all routes in UserController
      }
  }
