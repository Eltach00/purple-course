import { IUser } from '@purple-course/interfaces';
import { IsString } from 'class-validator';

export namespace AccountGetInfo {
  export const topic = 'account.user-info.command';
  export class Request {
    @IsString()
    id: string;
  }
  export class Response {
    user: Omit<IUser, 'passwordHash'>;
  }
}
