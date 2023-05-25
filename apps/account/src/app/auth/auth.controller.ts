import { RMQRoute } from 'nestjs-rmq';
import { AccountRegister } from '@purple-course/contracts';
import { AccountLogin } from '@purple-course/contracts';
import { Body, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @RMQRoute(AccountRegister.topic)
  async register(
    @Body() dto: AccountRegister.Request
  ): Promise<AccountRegister.Response> {
    return this.authService.register(dto);
  }

  @RMQRoute(AccountLogin.topic)
  async login(
    @Body() dto: AccountLogin.Request
  ): Promise<AccountLogin.Response> {
    const { id } = await this.authService.login(dto);
    return this.authService.jwtAccess(id);
  }
}
