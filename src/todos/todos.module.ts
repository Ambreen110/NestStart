import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from 'src/schema/Todo.schema';
import { TodoController } from './todos.controller';
import { TodosService } from './todos.service';
import { User, UserSchema } from 'src/schema/User.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Todo.name,
        schema: TodoSchema,
      },
      {
        name: User.name,
        schema: UserSchema
      },
    ]),
  ],
  controllers: [TodoController],
  providers: [TodosService],
})
export class TodosModule {}
