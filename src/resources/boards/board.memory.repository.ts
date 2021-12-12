import { IBoardResBody, ITaskResBody } from '../interfaces';
import { removeBoardTasks } from '../tasks/task.memory.repository';

const db: IBoardResBody[] = [];

export const boardsRepo = {
  /**
   * Get all boards from DB.
   * @returns Array of boards Promise\<IUserResBody[]\>.
   */

  getAll: async () => db,

  /**
   * Get one board from DB by id.
   * @param id - board id IBoardResBody['id'] or string.
   * @returns one board by id or undefined Promise \<IBoardResBody  | undefined\>.
   */

  getOne: async (id: IBoardResBody['id']) => {
    const item = db.find((elem) => elem.id === id);
    return item;
  },

  /**
   * Add board to DB.
   * @param user - board object IBoardResBody.
   * @returns added board Promise\<IBoardResBody\>.
   */

  add: async (board: IBoardResBody) => {
    db.push(board);
    return board;
  },

  /**
   * Remove board from DB and remove all tasks assigned to board.
   * @param id - board id IBoardResBody['id'] or string.
   * @returns index of the deleted board in the DB Promise\<number\>.
   */

  remove: async (id: IBoardResBody['id']) => {
    const index = db.findIndex((board) => board.id === id);
    removeBoardTasks(id);
    db.splice(index, 1);
    return index;
  },

  /**
   * Update board in the DB.
   * @param id - board id IBoardResBody['id'] or string.
   * @param user - board object IBoardResBody.
   * @returns updated board object or null Promise\<IBoardResBody | null\>.
   */

  update: async (id: IBoardResBody['id'], board: IBoardResBody) => {
    const index = db.findIndex((el) => el.id === id);
    if (index < 0) {
      return null;
    }
    db[index] = { ...board, id };
    return db[index];
  },
};

/**
 * Check is board with id exist.
 * @param id - board id ITaskResBody['boardId'] or string.
 * @returns is board exist boolean.
 */

export const checkIsBoardExist = (id: ITaskResBody['boardId']) => {
  const isBoardExist = db.some((elem) => elem.id === id);
  return isBoardExist;
};
