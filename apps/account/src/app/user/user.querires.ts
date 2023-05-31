import { UserRepository } from './repositories/user.repository';
import { Body, Controller } from '@nestjs/common';
import { AccountGetInfo, AccountUserCourses } from '@purple-course/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

@Controller()
export class UserQueries {
  constructor(private readonly userRepository: UserRepository) {}

  @RMQValidate()
  @RMQRoute(AccountGetInfo.topic)
  async userinfo(
    @Body() { id }: AccountGetInfo.Request
  ): Promise<AccountGetInfo.Response> {
    const user = await this.userRepository.findUserById(id);
    return { user };
  }

  @RMQValidate()
  @RMQRoute(AccountUserCourses.topic)
  async userCourses(
    @Body() { id }: AccountUserCourses.Request
  ): Promise<AccountUserCourses.Response> {
    const user = await this.userRepository.findUserById(id);
    return { courses: user.courses };
  }
}
