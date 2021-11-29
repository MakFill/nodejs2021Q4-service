const db = require('./users.db.json');

const getAll = async () => db;

const getOne = async (id) => {
  const item = await db.find((elem) => elem.id === id);
  return item;
};

const add = async (user) => {
  db.push(user);
  return user;
};

const remove = async (id) => {
  const index = db.findIndex((user) => user.id === id);
  db.splice(index, 1);
  return index;
};

const update = async (id, user) => {
  const index = db.findIndex((el) => el.id === id);
  db[index] = { ...user, id };
  return db[index];
};

module.exports = { getAll, getOne, add, remove, update };
