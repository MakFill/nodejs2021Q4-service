import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { getToken } from './login.schema';

export function loginRoute(
  server: FastifyInstance,
  _: FastifyPluginOptions,
  done: CallableFunction
) {
  server.post('/login', getToken);

  done();
}
