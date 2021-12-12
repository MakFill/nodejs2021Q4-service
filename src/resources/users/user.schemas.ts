import {
  getAllUsers,
  getUser,
  updateUser,
  addUser,
  removeUser,
} from './user.service';

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

export const getUsersOpts = {
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

export const getUserOpts = {
  schema: {
    response: {
      200: User,
    },
  },
  handler: getUser,
};

export const postUserOpts = {
  schema: {
    body: UserBody,
    response: {
      201: User,
    },
  },
  handler: addUser,
};

export const deleteUserOpts = {
  handler: removeUser,
};

export const putUserOpts = {
  schema: {
    body: UserBody,
    response: {
      200: User,
    },
  },
  handler: updateUser,
};
