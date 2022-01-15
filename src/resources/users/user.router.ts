import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  getUserOpts,
  getUsersOpts,
  postUserOpts,
  deleteUserOpts,
  putUserOpts,
} from './user.schemas';

/**
 * Handle all rotes related to users.
 * @param fastify - Fastify server instance FastifyInstance.
 * @param _ - in this case unused param for setting Fastify instance options FastifyPluginOptions.
 * @param done - function we would call at the end of the userRoutes function, to indicate we are done CallableFunction.
 * @returns void
 */

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
