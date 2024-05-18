/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './users.controller';
import { UsersServices } from './users.service';
import { User, UserSchema } from '../schema/User.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRATION'),
          },
        };
      },
    }),
    MongooseModule.forFeature([{ name: User.name , schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UsersServices],
  exports: [ PassportModule,MongooseModule],
})
export class UserModule {}
