const {
  getAllUsers,
  getUser,
  updateUser,
  addUser,
  removeUser,
} = require('./user.service');

const User = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
  },
};

const UserBody = {
  type: 'object',
  required: ['name', 'login', 'password'],
  properties: {
    name: { type: 'string' },
    login: { type: 'string' },
    password: { type: 'string' },
  },
};

const getUsersOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: User,
      },
    },
  },
  handler: getAllUsers,
};

const getUserOpts = {
  schema: {
    response: {
      200: User,
    },
  },
  handler: getUser,
};

const postUserOpts = {
  schema: {
    body: UserBody,
    response: {
      201: User,
    },
  },
  handler: addUser,
};

const deleteUserOpts = {
  handler: removeUser,
};

const putUserOpts = {
  schema: {
    body: UserBody,
    response: {
      200: User,
    },
  },
  handler: updateUser,
};

module.exports = {
  getUsersOpts,
  getUserOpts,
  postUserOpts,
  deleteUserOpts,
  putUserOpts,
};
