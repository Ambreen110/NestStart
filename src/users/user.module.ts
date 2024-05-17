/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schema/User.schema";
import { UsersServices } from "./users.service";
import { UserController } from "./users.controller";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";


@Module({
    imports:[
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
          inject: [ConfigService],
          useFactory: (config: ConfigService) =>{
            return {
              secret : config.get<string>('JWT_SECRET'),
              signOptions : {
                expiresIn : config.get<string | number>('JWT_EXPIRATION'),
              }
            }
          }
        }),
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        }])
    ],
    providers:[ UsersServices],
    controllers:[ UserController]
})
export class UserModule {}