import { IUser } from './user.interface';

export type IUserBody = Omit<IUser, 'id'>;
