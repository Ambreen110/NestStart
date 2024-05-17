/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { TodosModule } from './todos/todos.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    UserModule,
    TodosModule,
  ],
 
})
export class AppModule {}
export { Module };

