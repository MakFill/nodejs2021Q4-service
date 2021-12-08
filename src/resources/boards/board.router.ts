import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  getBoardOpts,
  getBoardsOpts,
  postBoardOpts,
  deleteBoardOpts,
  putBoardOpts,
} from './board.schemas';

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
