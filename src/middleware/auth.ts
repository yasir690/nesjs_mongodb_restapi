import { Injectable, NestMiddleware, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';  // Import your UserService to check if the user exists

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Retrieve token from 'x-access-token' header
    const token = req.headers['x-access-token'];

    // Check if token exists
    if (!token || token === '' || token === undefined) {
      throw new BadRequestException('A token is required for authentication');
    }

    try {
      // Decode the token
      const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET);

      // Extract user ID from the decoded token
      const userId = decoded.userId; // Change this if your token payload key is different

      // Check if user exists in the database using the userId
      const userExists = await this.userService.findById(userId);

      if (!userExists) {
        // If user doesn't exist, throw a NotFoundException
        throw new NotFoundException('User not found');
      }

      // Attach user data to the request object
      req.user = userExists;

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        // Handle expired token error
        throw new UnauthorizedException('Token has expired');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        // Handle invalid token error
        throw new UnauthorizedException('Invalid or malformed token');
      }
      // Catch any other errors
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
