const dbTasks = require('./tasks.db.json');
const dbBoards = require('../boards/boards.db.json');
// const dbUsers = require('../users/users.db.json');

const getAll = async (boardId) => {
  const board = await dbBoards.find((elem) => elem.id === boardId);
  if (board.id) {
    const tasks = await dbTasks.filter((elem) => elem.boardId === boardId);
    return tasks;
  }
  throw new Error();
};

const getOne = async (boardId, taskId) => {
  const board = await dbBoards.find((elem) => elem.id === boardId);

  if (board.id) {
    const tasks = await dbTasks.filter((elem) => elem.boardId === boardId);
    const task = await tasks.find((el) => el.id === taskId);
    return task;
  }
  throw new Error();
};

const add = async (boardId, task) => {
  const board = await dbBoards.find((elem) => elem.id === boardId);

  if (board.id) {
    const taskObj = { ...task, boardId };
    dbTasks.push(taskObj);
    return taskObj;
  }
  throw new Error();
};

const remove = async (taskId, boardId) => {
  const board = await dbBoards.find((elem) => elem.id === boardId);

  if (board.id) {
    const index = dbTasks.findIndex((task) => task.id === taskId);
    dbTasks.splice(index, 1);
    return index;
  }
  throw new Error();
};

const update = async (taskId, boardId, task) => {
  const board = await dbBoards.find((elem) => elem.id === boardId);

  if (board.id) {
    const index = dbTasks.findIndex((elem) => elem.id === taskId);
    dbTasks[index] = { ...task, taskId };
    return dbTasks[index];
  }
  throw new Error();
};

module.exports = { getAll, getOne, add, remove, update };
