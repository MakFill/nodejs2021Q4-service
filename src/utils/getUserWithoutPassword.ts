import { IUser, IUserResponse } from '../users/interfaces/user.interface';

export function getUserWithoutPassword(user: IUser): IUserResponse {
  return { id: user.id, name: user.name, login: user.login };
}
