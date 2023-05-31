import { UserEntity } from './entities/user.entity';
import { Body, Controller } from '@nestjs/common';
import { AccountChangeProfile } from '@purple-course/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { UserRepository } from './repositories/user.repository';

@Controller()
export class UserCommands {
  constructor(private readonly userRepository: UserRepository) {}

  @RMQValidate()
  @RMQRoute(AccountChangeProfile.topic)
  async changeProfile(
    @Body() { user, id }: AccountChangeProfile.Request
  ): Promise<AccountChangeProfile.Response> {
    const existedUser = await this.userRepository.findUserById(id);
    if (!existedUser) {
      throw new Error('User not found');
    }
    const userEntity = new UserEntity(existedUser).updateProfile(
      user.displayname
    );
    await this.userRepository.updateUser(userEntity);
    return {};
  }
}
