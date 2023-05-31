export enum UserRole {
  Teacher = 'Teacher',
  Student = 'Student',
}
export interface IUser {
  _id?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  courses?: IUserCourses[];
}

export enum PurchaseState {
  Started = 'Started',
  WaitingPayment = 'WaitingPayment',
  Purchased = 'Purchased',
  Cancelled = 'Cancelled',
}

export interface IUserCourses {
  _id?: string;
  courseId: string;
  purchaseState: PurchaseState;
}
