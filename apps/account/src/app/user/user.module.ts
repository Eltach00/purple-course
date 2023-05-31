import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import {
  UserCourses,
  UserModel,
  userCoursesSchema,
  userSchema,
} from './models/user.model';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './user.service';
import { UserCommands } from './user.commands';
import { UserQueries } from './user.querires';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: userSchema },
      { name: UserCourses.name, schema: userCoursesSchema },
    ]),
  ],
  providers: [UserRepository, UserService],
  exports: [UserRepository],
  controllers: [UserCommands, UserQueries],
})
export class UserModule {}
