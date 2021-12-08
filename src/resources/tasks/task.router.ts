import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  getTaskOpts,
  getTasksOpts,
  postTaskOpts,
  deleteTaskOpts,
  putTaskOpts,
} from './task.schemas';

export function taskRoutes(
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  done: CallableFunction
) {
  fastify.get('/boards/:boardId/tasks', getTasksOpts);

  fastify.get('/boards/:boardId/tasks/:taskId', getTaskOpts);

  fastify.post('/boards/:boardId/tasks', postTaskOpts);

  fastify.delete('/boards/:boardId/tasks/:taskId', deleteTaskOpts);

  fastify.put('/boards/:boardId/tasks/:taskId', putTaskOpts);

  done();
}
