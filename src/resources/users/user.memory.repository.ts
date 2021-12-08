import { IUserReqBody } from '../interfaces';
import { tasksRepo } from '../tasks/task.memory.repository';
// import { IUserReqBody } = require('../interfaces');

const db: IUserReqBody[] = [];

export const usersRepo = {
  getAll: async () => db,

  getOne: async (id: IUserReqBody['id']) => {
    const item = db.find((elem) => elem.id === id);
    return item;
  },

  add: async (user: IUserReqBody) => {
    db.push(user);
    return user;
  },

  remove: async (id: IUserReqBody['id']) => {
    const index = db.findIndex((user) => user.id === id);

    tasksRepo.setUsersIdToNull(id);
    db.splice(index, 1);
    return index;
  },

  update: async (id: IUserReqBody['id'], user: IUserReqBody) => {
    const index = db.findIndex((el) => el.id === id);
    if (index < 0) {
      return null;
    }
    db[index] = { ...user, id };
    return db[index];
  },
};
