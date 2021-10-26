import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true, strict: false })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: number;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  first_name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
