const dbTasks = require('./tasks.db.json');
const dbBoards = require('../boards/boards.db.json');
// const dbUsers = require('../users/users.db.json');

const getAll = async (boardId) => {
  try {
    const board = await dbBoards.find((elem) => elem.id === boardId);
    if (board.id) {
      const tasks = await dbTasks.filter((elem) => elem.boardId === boardId);
      return tasks;
    }
  } catch (err) {
    return null;
  }
};

const getOne = async (boardId, taskId) => {
  try {
    const board = await dbBoards.find((elem) => elem.id === boardId);
    if (board.id) {
      const tasks = await dbTasks.filter((elem) => elem.boardId === boardId);
      const task = await tasks.find((el) => el.id === taskId);
      return task;
    }
  } catch (err) {
    return null;
  }
};

const add = async (boardId, task) => {
  try {
    const board = await dbBoards.find((elem) => elem.id === boardId);
    if (board.id) {
      const taskObj = { ...task, boardId };
      dbTasks.push(taskObj);
      return taskObj;
    }
  } catch (err) {
    return null;
  }
};

const remove = async (taskId, boardId) => {
  try {
    const board = await dbBoards.find((elem) => elem.id === boardId);

    if (board.id) {
      const index = dbTasks.findIndex((task) => task.id === taskId);
      dbTasks.splice(index, 1);
      return index;
    }
  } catch (err) {
    return null;
  }
};

const update = async (taskId, boardId, task) => {
  try {
    const board = await dbBoards.find((elem) => elem.id === boardId);

    if (board.id) {
      const index = dbTasks.findIndex((elem) => elem.id === taskId);
      dbTasks[index] = { ...task, taskId };
      return dbTasks[index];
    }
  } catch (err) {
    return null;
  }
};

module.exports = { getAll, getOne, add, remove, update };
