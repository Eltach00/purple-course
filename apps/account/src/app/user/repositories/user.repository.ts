import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from '../models/user.model';
import { Model } from 'mongoose';
import { UserEntity } from '../entities/user.entity';

export class UserRepository {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>
  ) {}

  async createUser(user: UserEntity) {
    const newUser = new this.userModel(user);
    newUser.save();
    return newUser;
  }

  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string) {
    return this.userModel.findById(id).exec();
  }
}
