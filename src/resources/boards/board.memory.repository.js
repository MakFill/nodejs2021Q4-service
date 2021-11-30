const db = require('./boards.db.json');
let dbTasks = require('../tasks/tasks.db.json');

const getAll = async () => db;

const getOne = async (id) => {
  const item = await db.find((elem) => elem.id === id);
  return item;
};

const add = async (board) => {
  db.push(board);
  return board;
};

const remove = async (id) => {
  const index = db.findIndex((board) => board.id === id);
  // dbTasks.forEach((task, ind) => {
  //   if (task.boardId === id) {
  //     dbTasks.splice(ind, 1);
  //   }
  // });
  dbTasks = dbTasks.filter((task) => task.boardId !== id);
  db.splice(index, 1);
  return index;
};

const update = async (id, board) => {
  const index = db.findIndex((el) => el.id === id);
  db[index] = { ...board, id };
  return db[index];
};

module.exports = { getAll, getOne, add, remove, update };
