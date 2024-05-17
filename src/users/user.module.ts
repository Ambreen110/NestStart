/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schema/User.schema";
import { UsersServices } from "./users.service";
import { UserController } from "./users.controller";


@Module({
    imports:[
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        }])
    ],
    providers:[ UsersServices],
    controllers:[ UserController]
})
export class UserModule {}