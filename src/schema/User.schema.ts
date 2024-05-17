/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class User {

  @Prop({ unique: true, required: true})
  username: string 

  
}

 export const UserSchema=    SchemaFactory.createForClass(User)
