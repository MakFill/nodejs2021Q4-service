const db = require('../db.json')[0];
const { checkIsBoardExist } = require('../../helpers/checkIsBoardExist');

const getAll = async (boardId) => {
  if (checkIsBoardExist(boardId)) {
    const tasks = db.tasks.filter((elem) => elem.boardId === boardId);
    return tasks;
  }
  return null;
};

const getOne = async (boardId, taskId) => {
  if (checkIsBoardExist(boardId)) {
    const tasks = db.tasks.filter((elem) => elem.boardId === boardId);
    try {
      const task = tasks.find((el) => el.id === taskId);
      return task;
    } catch (err) {
      return null;
    }
  }
  return null;
};

const add = async (boardId, task) => {
  if (checkIsBoardExist(boardId)) {
    const taskObj = { ...task, boardId };
    db.tasks.push(taskObj);
    return taskObj;
  }
  return null;
};

const remove = async (taskId, boardId) => {
  if (checkIsBoardExist(boardId)) {
    const index = db.tasks.findIndex((task) => task.id === taskId);
    db.tasks.splice(index, 1);
    return index;
  }
  return null;
};

const update = async (taskId, boardId, task) => {
  if (checkIsBoardExist(boardId)) {
    const index = db.tasks.findIndex((elem) => elem.id === taskId);
    db.tasks[index] = { ...task, taskId };
    return db.tasks[index];
  }
  return null;
};

module.exports = { getAll, getOne, add, remove, update };
