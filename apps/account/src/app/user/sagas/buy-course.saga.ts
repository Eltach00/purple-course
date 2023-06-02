import { RMQService } from 'nestjs-rmq';
import { UserEntity } from '../entities/user.entity';
import { PurchaseState } from '@purple-course/interfaces';
import { BuyCourseSagaState } from './buy-course.state';
import {
  BuyCourseSageStateCancelled,
  BuyCourseSageStateFinished,
  BuyCourseSageStateProcess,
  BuyCourseSageStateStarted,
} from './buy-course.steps';

export class BuyCourseSaga {
  private state: BuyCourseSagaState;

  constructor(
    public user: UserEntity,
    public courseId: string,
    public rmqService: RMQService
  ) {}

  getState() {
    return this.state;
  }

  setState(state: PurchaseState, courseId: string) {
    switch (state) {
      case PurchaseState.Started:
        this.state = new BuyCourseSageStateStarted();
        break;
      case PurchaseState.WaitingPayment:
        this.state = new BuyCourseSageStateProcess();
        break;
      case PurchaseState.Purchased:
        this.state = new BuyCourseSageStateFinished();
        break;
      case PurchaseState.Cancelled:
        this.state = new BuyCourseSageStateCancelled();
        break;
    }
    this.state.setContext(this);
    this.user.setCourseStatus(courseId, state);
  }
}
