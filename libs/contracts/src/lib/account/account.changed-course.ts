import { PurchaseState } from '@purple-course/interfaces';
import { IsString } from 'class-validator';

export namespace AccountChangedCourse {
  export const topic = 'account.changed-course.event';

  export class Request {
    @IsString()
    courseId: string;

    @IsString()
    userId: string;

    @IsString()
    state: PurchaseState;
  }
}
