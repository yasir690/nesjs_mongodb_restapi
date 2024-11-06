// import { MongooseModule } from "@nestjs/mongoose";

// import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
// import { User, UserSchema } from "src/schema/user.schema";
// import { UserService } from "./user.service";
// import { UserController } from "./user.controller";
// import { AuthMiddleware } from "src/middleware/auth";


// @Module({
//     imports: [
//       MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Register Post model
//     ],
//     providers: [UserService],
//     controllers: [UserController], // If you have a controller
//     exports: [UserService], // If you need to use PostService in other modules
//   })
//   export class UserModule implements NestModule  {
//     configure(consumer: MiddlewareConsumer) {
//         // Apply middleware only to routes in the UserController (e.g., login)
//         consumer
//           .apply(AuthMiddleware)
//         //   .forRoutes('user/getuser', 'user/updateuser/:id', 'user/deleteuser/:id');
//          .forRoutes(UserController)
//     }
//   }


import { MongooseModule } from "@nestjs/mongoose";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { User, UserSchema } from "src/schema/user.schema";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { AuthMiddleware } from "src/middleware/auth";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('user/getuser', 'user/updateuser/:id', 'user/deleteuser/:id');
  }
}
