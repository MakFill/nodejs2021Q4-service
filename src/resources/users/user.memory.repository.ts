import { IUserResBody } from '../interfaces';
import { setUsersIdToNull } from '../tasks/task.memory.repository';

const db: IUserResBody[] = [];

export const usersRepo = {
  /**
   * Get all users from DB.
   * @returns Array of users Promise\<IUserResBody[]\>.
   */

  getAll: async () => db,

  /**
   * Get one user from DB by id.
   * @param id - user id IUserResBody['id'] or string.
   * @returns one user by id or undefined Promise \<IUserResBody | undefined\>.
   */

  getOne: async (id: IUserResBody['id']) => {
    const item = db.find((elem) => elem.id === id);
    return item;
  },

  /**
   * Add user to DB.
   * @param user - user object IUserResBody.
   * @returns added user Promise\<IUserResBody\>.
   */

  add: async (user: IUserResBody) => {
    db.push(user);
    return user;
  },

  /**
   * Remove user from DB and set userId to null in the each task assigned to user.
   * @param id - user id IUserResBody['id'] or string.
   * @returns index of the deleted user in the DB Promise\<number\>.
   */

  remove: async (id: IUserResBody['id']) => {
    const index = db.findIndex((user) => user.id === id);

    setUsersIdToNull(id);
    db.splice(index, 1);
    return index;
  },

  /**
   * Update user in the DB.
   * @param id - user id IUserResBody['id'] or string.
   * @param user - user object IUserResBody.
   * @returns updated user object or null Promise\<IUserResBody | null\>.
   */

  update: async (id: IUserResBody['id'], user: IUserResBody) => {
    const index = db.findIndex((el) => el.id === id);
    if (index < 0) {
      return null;
    }
    db[index] = { ...user, id };
    return { ...user, id };
  },
};
