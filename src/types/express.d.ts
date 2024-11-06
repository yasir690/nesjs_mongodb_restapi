import { User } from "src/schema/user.schema";

declare global {
    namespace Express {
      interface Request {
        user?: User; // Add `user` property to the Request object
      }
    }
  }