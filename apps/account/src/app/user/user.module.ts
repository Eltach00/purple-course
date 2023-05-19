import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserModel, userSchema } from './models/user.model';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: userSchema }]),
  ],
  providers: [UserRepository, UserService],
  exports: [UserRepository],
})
export class UserModule {}
