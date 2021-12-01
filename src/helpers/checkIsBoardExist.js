const db = require('../resources/db.json')[0];

const checkIsBoardExist = (id) => {
  const board = db.boards.find((elem) => elem.id === id);
  return board;
};

module.exports = { checkIsBoardExist };
