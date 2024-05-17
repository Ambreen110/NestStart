import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodosDto } from './dto/CreateTodos.dto';
import { User } from 'src/schema/User.schema';
import { Todo } from 'src/schema/Todo.schema';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) private todoModel: Model<Todo>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createTodo({ userId, ...createTodosDto }: CreateTodosDto) {
    const findUser = await this.userModel.findById(userId);
    if (!findUser) throw new HttpException('User Not Found', 404);
    const newTodo = new this.todoModel({ ...createTodosDto, user: userId });
    const savedTodo = await newTodo.save();
    await findUser.updateOne({
      $push: {
        todos: savedTodo._id,
      },
    });
    return savedTodo;
  }
  getTodos() {
    return this.todoModel.find();
  }
  async getTodosByUserId(userId: string): Promise<Todo[]> {
    const user = await this.userModel.findById(userId).populate('todos');
    if (!user) {
      throw new HttpException('User Not Found', 404);
    }
    return user.todos;
  }
}
