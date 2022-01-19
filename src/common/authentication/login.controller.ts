import { FastifyReply, FastifyRequest } from 'fastify';
import { server } from '../../app';
import { ILoginBody } from '../../resources/interfaces';
import { statusCodes } from '../utils';
import { getSignToken } from './login.service';

export const postLogin = async (req: FastifyRequest, reply: FastifyReply) => {
  const { login, password } = req.body as ILoginBody;
  const token = await getSignToken(login, password);
  if (!token) {
    reply.code(statusCodes.FORBIDDEN_REQUEST).send('Forbidden login request');
    server.log.warn('Forbidden login request');
  } else {
    reply.send({ token });
    server.log.info('Sign token');
  }
};
