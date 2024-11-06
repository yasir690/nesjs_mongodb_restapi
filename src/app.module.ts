import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./db/databasemodule";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schema/user.schema";
import { Posts, PostSchema } from "./schema/post.schema";
import { UserController } from "./user/user.controller";
import { PostController } from "./post/post.controller";
import { UserService } from "./user/user.service";
import { PostServices } from "./post/post.service";
import { AuthMiddleware } from "./middleware/auth";


@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),
    DatabaseModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Posts.name, schema: PostSchema },
    ]),
  ],
  controllers: [UserController,PostController],
  providers: [
    UserService,
    PostServices,
    

 
  ],
})


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('/user/getuser', '/user/updateuser', '/user/deleteuser',PostController);  }
}