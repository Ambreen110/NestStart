/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { TodosModule } from './todos/todos.module';
import { ConfigModule } from './config.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    UserModule,
    TodosModule,
    ConfigModule,
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET, 
    })
  ],
 
})
export class AppModule {}
export { Module };

