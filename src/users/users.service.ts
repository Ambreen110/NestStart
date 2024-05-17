/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schema/User.schema";
import { CreateUserDto } from "./dto/CreteUsers.dto";


@Injectable()
export class UsersServices {
    constructor( 
        @InjectModel( User.name) private userModel: Model<User>){}
    createUser(creteUserDto: CreateUserDto) {
        const newUser = new this.userModel(creteUserDto)
        return newUser.save()
    }  
    getUser(){
        return this.userModel.find()
    }
    getUserById(id:string){
return this.userModel.findById(id)
    }
}