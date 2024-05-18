/* eslint-disable prettier/prettier */
import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateTodosDto } from './dto/CreateTodos.dto';
import { User } from 'src/schema/User.schema';
import { Todo } from 'src/schema/Todo.schema';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
    @InjectModel(User.name) private readonly userModel: Model<User>
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
    const isValidId = mongoose.isValidObjectId(userId);
    if (!isValidId) {
      throw new BadRequestException('Please enter a correct ID.');
    }
    const todos = await this.todoModel.find({ user: userId });
    if (!todos.length) {
      throw new NotFoundException('Todos Not Found');
    }
    return todos;
  }
  
}

  

