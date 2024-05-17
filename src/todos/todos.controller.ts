/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTodosDto } from './dto/CreateTodos.dto';
import { TodosService } from './todos.service';
import mongoose from 'mongoose';

@Controller('todos')
export class TodoController {
  constructor(private todosServices: TodosService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createTodo(@Body() createTodoDto: CreateTodosDto) {
    return this.todosServices.createTodo(createTodoDto);
  }
  
  @Get()
  getTodos() {
    return this.todosServices.getTodos();
  }
  
  @Get(':userId')
  async getTodosById(@Param('userId') userId: string) {
    const isValid = mongoose.Types.ObjectId.isValid(userId);
    if (!isValid) throw new HttpException('user not found', 404);
    const findUser = await this.todosServices.getTodosByUserId(userId);
    return findUser; 
}
}