/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { Todo } from './Todo.schema'

@Schema()
export class User {

  @Prop({ unique: true, required: true})
  username: string 

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: () => Todo }]})
  todos:Todo[]
  
}

 export const UserSchema=    SchemaFactory.createForClass(User)
