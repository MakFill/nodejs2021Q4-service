const fastify = require('fastify')({ logger: true });
const swaggerUI = require('fastify-swagger');
const path = require('path');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

fastify.register(userRouter);
fastify.register(boardRouter);
fastify.register(taskRouter);
fastify.register(swaggerUI, {
  exposeRoute: true,
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
  },
});

fastify.get('/', (req, reply) => {
  if (req.url === '/') {
    reply.send('Service is running!');
  } else {
    reply.send('Something went wrong');
  }
});

module.exports = fastify;
