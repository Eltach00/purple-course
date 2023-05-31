import { IUser } from '@purple-course/interfaces';
import { IsString } from 'class-validator';

export namespace AccountChangeProfile {
  export const topic = 'account.change-profile.command';
  export class Request {
    @IsString()
    id: string;

    @IsString()
    user: Pick<IUser, 'displayname'>;
  }
  export class Response {}
}
