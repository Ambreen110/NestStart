/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from 'src/schema/Todo.schema';
import { TodoController } from './todos.controller';
import { TodosService } from './todos.service';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    UserModule,
  ],
  controllers: [TodoController],
  providers: [TodosService],
})
export class TodosModule {}
