import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  getTaskOpts,
  getTasksOpts,
  postTaskOpts,
  deleteTaskOpts,
  putTaskOpts,
} from './task.schemas';

/**
 * Handle all rotes related to tasks.
 * @param fastify - Fastify server instance FastifyInstance.
 * @param _ - in this case unused param for setting Fastify instance options FastifyPluginOptions.
 * @param done - function we would call at the end of the taskRoutes function, to indicate we are done CallableFunction.
 * @returns void
 */

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
