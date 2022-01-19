import { postLogin } from './login.controller';

const LoginBody = {
  type: 'object',
  required: ['login', 'password'],
  properties: {
    login: { type: 'string' },
    password: { type: 'string' },
  },
};

const Token = {
  type: 'object',
  required: ['token'],
  properties: {
    token: { type: 'string' },
  },
};

export const getToken = {
  schema: {
    body: LoginBody,
    response: {
      200: Token,
    },
  },
  handler: postLogin,
};
