import fastify, {
  FastifyRequest,
  FastifyReply,
  FastifyInstance,
} from 'fastify';
import { fastifySwagger } from 'fastify-swagger';
import * as path from 'path';
import pino from 'pino';
import { IncomingMessage, Server, ServerResponse } from 'http';
import 'reflect-metadata';
import { userRoutes } from './resources/users/user.router';
import { boardRoutes } from './resources/boards/board.router';
import { taskRoutes } from './resources/tasks/task.router';
import { logger, handleLogging } from './common/utils';
import { pgConnect } from './db/pg-connect';
import { loginRoute } from './common/authentication/login.router';
import { verifyToken } from './common/authentication/checkToken';

export const server: FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse,
  pino.Logger
> = fastify({
  logger,
});

handleLogging(server);
verifyToken(server);

server.register(loginRoute);
server.register(pgConnect);
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

server.get('/', (_: FastifyRequest, reply: FastifyReply) => {
  reply.send('Service is running!');
});
