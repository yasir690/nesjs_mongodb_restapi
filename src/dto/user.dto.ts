import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class createUserDto {

    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsString()
    email: string;
    @IsNotEmpty()
    @IsString()
    password: string;
}

export class loginUserDto{
    @IsNotEmpty()
    @IsString()
    email: string;
    @IsNotEmpty()
    @IsString()
    password: string;
}

export class updateUserDto {
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    name: string;
    @IsNotEmpty()
    @IsString()
    @IsOptional()

    email: string;
    @IsNotEmpty()
    @IsString()
    @IsOptional()

    password: string;
}