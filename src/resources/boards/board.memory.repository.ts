import { IBoardResBody, ITaskResBody } from '../interfaces';
import { tasksRepo } from '../tasks/task.memory.repository';

const db: IBoardResBody[] = [];

export const checkIsBoardExist = (id: ITaskResBody['boardId']) => {
  const isBoardExist = db.some((elem) => elem.id === id);
  return isBoardExist;
};

export const boardsRepo = {
  getAll: async () => db,

  getOne: async (id: IBoardResBody['id']) => {
    const item = db.find((elem) => elem.id === id);
    return item;
  },

  add: async (board: IBoardResBody) => {
    db.push(board);
    return board;
  },

  remove: async (id: IBoardResBody['id']) => {
    const index = db.findIndex((board) => board.id === id);
    tasksRepo.removeBoardUsers(id);
    db.splice(index, 1);
    return index;
  },

  update: async (id: IBoardResBody['id'], board: IBoardResBody) => {
    const index = db.findIndex((el) => el.id === id);
    if (index < 0) {
      return null;
    }
    db[index] = { ...board, id };
    return db[index];
  },
};
