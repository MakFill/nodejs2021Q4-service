import { checkIsBoardExist } from '../boards/board.memory.repository';
import { IBoardResBody, ITaskResBody, IUserResBody } from '../interfaces';

const db: ITaskResBody[] = [];

export const tasksRepo = {
  /**
   * Get all tasks from DB.
   * @param boardId - board id assigned to this task ITaskResBody['boardId'] or string.
   * @returns Array of tasks or null Promise\<ITaskResBody[] | null\>.
   */

  getAll: async (boardId: ITaskResBody['boardId']) => {
    if (checkIsBoardExist(boardId)) {
      const tasks = db.filter((elem) => elem.boardId === boardId);
      return tasks;
    }
    return null;
  },

  /**
   * Get one task from DB by id.
   * @param boardId - board id assigned to this task ITaskResBody['boardId'] or string.
   * @param taskId - task id ITaskResBody['id'] or string.
   * @returns one task by id or null Promise \<ITaskResBody | null\>.
   */

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

  /**
   * Add task to DB.
   * @param boardId - board id assigned to this task ITaskResBody['boardId'] or string.
   * @param task - task object ITaskResBody.
   * @returns added task Promise\<ITaskResBody | null\>.
   */

  add: async (boardId: ITaskResBody['boardId'], task: ITaskResBody) => {
    if (checkIsBoardExist(boardId)) {
      const taskObj = { ...task, boardId };
      db.push(taskObj);
      return taskObj;
    }
    return null;
  },

  /**
   * Remove task from DB.
   * @param taskId - task id ITaskResBody['id'] or string.
   * @param boardId - board id assigned to this task ITaskResBody['boardId'] or string.
   * @returns index of the deleted task in the DB or null Promise\<number | null\>.
   */

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

  /**
   * Update task in the DB.
   * @param taskId - task id ITaskResBody['id'] or string.
   * @param boardId - board id assigned to this task ITaskResBody['boardId'] or string.
   * @param task - task object ITaskResBody.
   * @returns updated task object or null Promise\<IBoardResBody | null\>.
   */

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
};

/**
 * Set all tasks.userId assigned to deleted user (by user id) to null.
 * @param id - user id IUserResBody['id'] or string.
 * @returns Promise\<void\>
 */

export const setUsersIdToNull = async (id: IUserResBody['id']) => {
  db.forEach((task, ind) => {
    if (task.userId === id) {
      db[ind].userId = null;
    }
  });
};

/**
 * Remove all tasks with assigned boardId (by board id).
 * @param id - board id IBoardResBody['id'] or string.
 * @returns Promise\<void\>
 */

export const removeBoardTasks = async (id: IBoardResBody['id']) => {
  db.forEach((task, ind) => {
    if (task.boardId === id) {
      db.splice(ind, 1);
    }
  });
};
