/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schema/User.schema";
import { CreateUserDto } from "./dto/CreteUsers.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./dto/Login.dto";


@Injectable()
export class UsersServices {
    constructor( 
        @InjectModel( User.name) 
        private userModel: Model<User>,
        private jwtService: JwtService,
    ){}
    
    async signup(signupDto: CreateUserDto): Promise<{ token :string}>{
        const { name , email , password} = signupDto
    
        const hashedPassword = await bcrypt.hash(password, 10)
    
        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword,
        })
        const token = this.jwtService.sign({ id: user._id})
    
        return {token}
      }
    
      async login(loginDto: LoginDto): Promise<{token: string}>{
      const { email, password} = loginDto
    
      const user = await this.userModel.findOne({email})
    
      if(!user) throw new UnauthorizedException('Invalid email')
    
        const isPasswordOk = await bcrypt.compare(password, user.password)
    
        if(!isPasswordOk) throw new UnauthorizedException(' password is incorrect')


            const token = this.jwtService.sign({ id: user._id})
    
            return {token}
    }
}