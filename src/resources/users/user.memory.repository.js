const db = require('../db.json')[0];

const getAll = async () => db.users;

const getOne = async (id) => {
  const item = db.users.find((elem) => elem.id === id);
  return item;
};

const add = async (user) => {
  db.users.push(user);
  return user;
};

const remove = async (id) => {
  const index = db.users.findIndex((user) => user.id === id);

  db.tasks.forEach((task, ind) => {
    if (task.userId === id) {
      db.tasks[ind].userId = null;
    }
  });
  db.users.splice(index, 1);
  return index;
};

const update = async (id, user) => {
  const index = db.users.findIndex((el) => el.id === id);
  db.users[index] = { ...user, id };
  return db.users[index];
};

module.exports = { getAll, getOne, add, remove, update };
