/* eslint-disable prettier/prettier */
import {  IsNotEmpty, IsString, MinLength } from "@nestjs/class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username :string

    @IsString()
    @IsNotEmpty()
    email:string
    

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string
}