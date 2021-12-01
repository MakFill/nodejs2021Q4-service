const db = require('../db.json')[0];

const getAll = async () => db.boards;

const getOne = async (id) => {
  const item = db.boards.find((elem) => elem.id === id);
  return item;
};

const add = async (board) => {
  db.boards.push(board);
  return board;
};

const remove = async (id) => {
  const index = db.boards.findIndex((board) => board.id === id);
  db.tasks.forEach((task, ind) => {
    if (task.boardId === id) {
      db.tasks.splice(ind, 1);
    }
  });
  db.boards.splice(index, 1);
  return index;
};

const update = async (id, board) => {
  const index = db.boards.findIndex((el) => el.id === id);
  if (index < 0) {
    return null;
  }
  db.boards[index] = { ...board, id };
  return db.boards[index];
};

module.exports = { getAll, getOne, add, remove, update };
