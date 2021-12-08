import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  getUserOpts,
  getUsersOpts,
  postUserOpts,
  deleteUserOpts,
  putUserOpts,
} from './user.schemas';

export function userRoutes(
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  done: CallableFunction
) {
  fastify.get('/users', getUsersOpts);

  fastify.get('/users/:userId', getUserOpts);

  fastify.post('/users', postUserOpts);

  fastify.delete('/users/:userId', deleteUserOpts);

  fastify.put('/users/:userId', putUserOpts);

  done();
}
