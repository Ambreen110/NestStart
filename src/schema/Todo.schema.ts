/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose';
import { User } from './User.schema';

@Schema()
export class Todo {

  @Prop({ required: true})
  task: string 

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User
  
}

 export const TodoSchema=    SchemaFactory.createForClass(Todo)
