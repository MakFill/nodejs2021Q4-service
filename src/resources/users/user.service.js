const { v4: uuidv4 } = require('uuid');
const usersRepo = require('./user.memory.repository');

const getAllUsers = async (req, reply) => {
  const users = await usersRepo.getAll();
  reply.send(users);
};

const getUser = async (req, reply) => {
  const { userId } = req.params;
  const user = await usersRepo.getOne(userId);
  if (!user) {
    reply.code(404).send('User not found');
  } else {
    reply.send(user);
  }
};

const addUser = async (req, reply) => {
  const { name, login, password } = req.body;
  const newUser = { name, login, password, id: uuidv4() };
  const user = await usersRepo.add(newUser);
  reply.code(201).send(user);
};

const removeUser = async (req, reply) => {
  const { userId } = req.params;
  const userIndex = await usersRepo.remove(userId);
  if (userIndex < 0) {
    reply.code(404).send('User not found');
  } else {
    reply.code(204);
  }
};

const updateUser = async (req, reply) => {
  const { name, login, password } = req.body;
  const { userId } = req.params;
  const newUser = { name, login, password };
  const user = await usersRepo.update(userId, newUser);
  if (!user) {
    reply.code(404).send('User not found');
  } else {
    reply.send(user);
  }
};

module.exports = { getAllUsers, getUser, addUser, removeUser, updateUser };
