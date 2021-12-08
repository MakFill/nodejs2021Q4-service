import { checkIsBoardExist } from '../boards/board.memory.repository';
import { IBoardResBody, ITaskResBody, IUserReqBody } from '../interfaces';

const db: ITaskResBody[] = [];

export const tasksRepo = {
  getAll: async (boardId: ITaskResBody['boardId']) => {
    if (checkIsBoardExist(boardId)) {
      const tasks = db.filter((elem) => elem.boardId === boardId);
      return tasks;
    }
    return null;
  },

  getOne: async (
    boardId: ITaskResBody['boardId'],
    taskId: ITaskResBody['id']
  ) => {
    if (checkIsBoardExist(boardId)) {
      const tasks = db.filter((elem) => elem.boardId === boardId);
      const task = tasks.find((el) => el.id === taskId);
      if (!task) {
        return null;
      }
      return task;
    }
    return null;
  },

  add: async (boardId: ITaskResBody['boardId'], task: ITaskResBody) => {
    if (checkIsBoardExist(boardId)) {
      const taskObj = { ...task, boardId };
      db.push(taskObj);
      return taskObj;
    }
    return null;
  },

  remove: async (
    taskId: ITaskResBody['id'],
    boardId: ITaskResBody['boardId']
  ) => {
    if (checkIsBoardExist(boardId)) {
      const index = db.findIndex((task) => task.id === taskId);
      if (index < 0) {
        return null;
      }
      db.splice(index, 1);
      return index;
    }
    return null;
  },

  update: async (
    taskId: ITaskResBody['id'],
    boardId: ITaskResBody['boardId'],
    task: ITaskResBody
  ) => {
    if (checkIsBoardExist(boardId)) {
      const index = db.findIndex((elem) => elem.id === taskId);
      if (index < 0) {
        return null;
      }
      db[index] = { ...task, boardId, id: taskId };
      return db[index];
    }
    return null;
  },

  setUsersIdToNull: async (id: IUserReqBody['id']) => {
    db.forEach((task, ind) => {
      if (task.userId === id) {
        db[ind].userId = null;
      }
    });
  },

  removeBoardUsers: async (id: IBoardResBody['id']) => {
    db.forEach((task, ind) => {
      if (task.boardId === id) {
        db.splice(ind, 1);
      }
    });
  },
};
