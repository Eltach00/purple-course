import {
  IUser,
  IUserCourses,
  PurchaseState,
  UserRole,
} from '@purple-course/interfaces';
import { compare, genSalt, hash } from 'bcryptjs';

export class UserEntity implements IUser {
  _id?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  courses?: IUserCourses[];
  displayname: string;

  constructor(user: IUser) {
    this.passwordHash = user.passwordHash;
    this._id = user._id;
    this.email = user.email;
    this.role = user.role;
    this.courses = user.courses;
    this.displayname = user.displayname;
  }

  public setCourseStatus(courseId: string, state: PurchaseState) {
    const existCourse = this.courses.find((c) => c._id === courseId);
    if (!existCourse) {
      this.courses.push({
        courseId,
        purchaseState: state,
      });
      return this;
    }
    if (state === PurchaseState.Cancelled) {
      this.courses = this.courses.filter((c) => c._id !== courseId);
      return this;
    }

    this.courses = this.courses.map((c) => {
      if (c._id === courseId) {
        c.purchaseState = state;
        return c;
      }
      return c;
    });
    return this;
  }

  public async setPassword(password: string) {
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public validatePassword(password: string) {
    return compare(password, this.passwordHash);
  }

  public getPublicProfile() {
    return {
      email: this.email,
      displayname: this.displayname,
      role: this.role,
    };
  }

  public updateProfile(displayname: string) {
    this.displayname = displayname;
    return this;
  }
}
