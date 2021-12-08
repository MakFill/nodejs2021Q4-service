import { v4 as uuid } from 'uuid';
import { IUserReqBody } from '../interfaces';

export class User {
  public id;

  public name;

  public login;

  public password;

  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: IUserReqBody) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
