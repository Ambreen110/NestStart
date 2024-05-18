import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersServices } from './users.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/CreteUsers.dto';

@Controller()
export class UserController {
  constructor(private authService: UsersServices) {}

  @Post('/signup')
  signUp(@Body() signUpDto: CreateUserDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Get('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }
}
