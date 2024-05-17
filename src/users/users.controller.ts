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
import { UsersServices } from './users.service';
import { CreateUserDto } from './dto/CreteUsers.dto';

@Controller('users')
export class UserController {
  constructor(private usersServices: UsersServices) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() createuserDto: CreateUserDto) {
    console.log(createuserDto);
    return this.usersServices.createUser(createuserDto);
  }
  @Get()
  getUsers() {
    return this.usersServices.getUser();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const findUser = await this.usersServices.getUserById(id);
    return findUser;
  }
}
