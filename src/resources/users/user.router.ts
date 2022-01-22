import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  getUserOpts,
  getUsersOpts,
  postUserOpts,
  deleteUserOpts,
  putUserOpts,
} from './user.schemas';

export function userRoutes(
  server: FastifyInstance,
  _: FastifyPluginOptions,
  done: CallableFunction
) {
  server.get('/users', getUsersOpts);

  server.get('/users/:userId', getUserOpts);

  server.post('/users', postUserOpts);

  server.delete('/users/:userId', deleteUserOpts);

  server.put('/users/:userId', putUserOpts);

  done();
}
