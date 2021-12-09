import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  getBoardOpts,
  getBoardsOpts,
  postBoardOpts,
  deleteBoardOpts,
  putBoardOpts,
} from './board.schemas';

/**
 * Handle all rotes related to boards.
 * @param fastify - Fastify server instance FastifyInstance.
 * @param _ - in this case unused param for setting Fastify instance options FastifyPluginOptions.
 * @param done - function we would call at the end of the boardRoutes function, to indicate we are done CallableFunction.
 * @returns void
 */

export function boardRoutes(
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  done: CallableFunction
) {
  fastify.get('/boards', getBoardsOpts);

  fastify.get('/boards/:boardId', getBoardOpts);

  fastify.post('/boards', postBoardOpts);

  fastify.delete('/boards/:boardId', deleteBoardOpts);

  fastify.put('/boards/:boardId', putBoardOpts);

  done();
}
