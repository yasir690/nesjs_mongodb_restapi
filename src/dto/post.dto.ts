import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class createPostDto {

    @IsNotEmpty()
    @IsString()
    title: string;
    @IsNotEmpty()
    @IsString()
    content: string;
    @IsNotEmpty()
    @IsString()
    author: string;
}

export class updatePostDto {
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    title: string;
    @IsNotEmpty()
    @IsString()
    @IsOptional()

    content: string;
    @IsNotEmpty()
    @IsString()
    @IsOptional()

    author: string;
}