import { v4 as uuid } from 'uuid';

export class User {
  public id;

  public name;

  public login;

  public password;

  /**
   * Create new user by object with fields name, login, password.
   * @param param0 - user object with fields name string, user string and password string.
   * @returns user object with id === uuid v4 IUserResBody.
   */

  constructor({ name = 'USER', login = 'user', password = 'P@55w0rd' } = {}) {
    this.id = uuid();
    this.name = name;
    this.login = login;
    this.password = password;
  }
}
