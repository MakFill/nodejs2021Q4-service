import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import { fastifySwagger } from 'fastify-swagger';
import * as path from 'path';
import { userRoutes } from './resources/users/user.router';
import { boardRoutes } from './resources/boards/board.router';
import { taskRoutes } from './resources/tasks/task.router';

export const server = fastify({ logger: true });

server.register(userRoutes);
server.register(boardRoutes);
server.register(taskRoutes);
server.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
    baseDir: __dirname,
  },
});

server.get('/', (req: FastifyRequest, reply: FastifyReply) => {
  if (req.url === '/') {
    reply.send('Service is running!');
  } else {
    reply.send('Something went wrong');
  }
});
