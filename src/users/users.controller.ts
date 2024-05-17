/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
 
} from '@nestjs/common';
import { UsersServices } from './users.service';
import { CreateUserDto } from './dto/CreteUsers.dto';
import { LoginDto } from './dto/Login.dto';
import { JwtExceptionFilter } from '@scandinavia/nestjs-libs';

@Controller('users')
@UseFilters(JwtExceptionFilter)
export class UserController {
  constructor(private usersServices: UsersServices) {}

  @Post('/signup')
  signUp(@Body() signupDto : CreateUserDto): Promise<{token: string}>{
      return this.usersServices.signup(signupDto)
  }

  @Get('/login')
  login(@Body() loginDto: LoginDto): Promise<{token: string}>{
      return this.usersServices.login(loginDto)
  }
}
