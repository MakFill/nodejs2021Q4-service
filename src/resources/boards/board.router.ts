import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  getBoardOpts,
  getBoardsOpts,
  postBoardOpts,
  deleteBoardOpts,
  putBoardOpts,
  getColumnssOpts,
} from './board.schemas';

export function boardRoutes(
  server: FastifyInstance,
  _: FastifyPluginOptions,
  done: CallableFunction
) {
  server.get('/boards', getBoardsOpts);

  server.get('/columns', getColumnssOpts);

  server.get('/boards/:boardId', getBoardOpts);

  server.post('/boards', postBoardOpts);

  server.delete('/boards/:boardId', deleteBoardOpts);

  server.put('/boards/:boardId', putBoardOpts);

  done();
}
