/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { Todo } from './Todo.schema'

@Schema()
export class User {

  @Prop()
  username:string

  @Prop({unique : [true, '  User with this email already exist']})
  email: string

  @Prop()
  password: string
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: () => User }]})
  todos:Todo[]
  
}

 export const UserSchema=    SchemaFactory.createForClass(User)
