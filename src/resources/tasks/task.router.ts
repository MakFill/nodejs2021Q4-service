import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  getTaskOpts,
  getTasksOpts,
  postTaskOpts,
  deleteTaskOpts,
  putTaskOpts,
} from './task.schemas';

export function taskRoutes(
  server: FastifyInstance,
  _: FastifyPluginOptions,
  done: CallableFunction
) {
  server.get('/boards/:boardId/tasks', getTasksOpts);

  server.get('/boards/:boardId/tasks/:taskId', getTaskOpts);

  server.post('/boards/:boardId/tasks', postTaskOpts);

  server.delete('/boards/:boardId/tasks/:taskId', deleteTaskOpts);

  server.put('/boards/:boardId/tasks/:taskId', putTaskOpts);

  done();
}
