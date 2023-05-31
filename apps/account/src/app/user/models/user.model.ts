import {
  IUser,
  IUserCourses,
  PurchaseState,
  UserRole,
} from '@purple-course/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class UserCourses extends Document implements IUserCourses {
  @Prop({ required: true })
  courseId: string;

  @Prop({
    required: true,
    enum: PurchaseState,
    type: String,
  })
  purchaseState: PurchaseState;
}

export const userCoursesSchema = SchemaFactory.createForClass(UserCourses);

@Schema()
export class UserModel extends Document implements IUser {
  @Prop()
  displayName?: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({
    required: true,
    enum: UserRole,
    type: String,
    default: UserRole.Student,
  })
  role: UserRole;

  @Prop({ type: [userCoursesSchema], _id: false })
  courses: Types.Array<UserCourses>;
}

export const userSchema = SchemaFactory.createForClass(UserModel);
