const {
  getTaskOpts,
  getTasksOpts,
  postTaskOpts,
  deleteTaskOpts,
  putTaskOpts,
} = require('./task.schemas');

function taskRoutes(fastify, options, done) {
  fastify.get('/boards/:boardId/tasks', getTasksOpts);

  fastify.get('/boards/:boardId/tasks/:taskId', getTaskOpts);

  fastify.post('/boards/:boardId/tasks', postTaskOpts);

  fastify.delete('/boards/:boardId/tasks/:taskId', deleteTaskOpts);

  fastify.put('/boards/:boardId/tasks/:taskId', putTaskOpts);

  done();
}

module.exports = taskRoutes;
