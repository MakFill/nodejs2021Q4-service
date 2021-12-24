import { FastifyInstance } from 'fastify';
import pino from 'pino';
import * as path from 'path';
import { statusCodes, loggingLevel } from './index';
import { LOGGER_LVL } from '../config';

const pinoPrettySettings = {
  ignore: 'pid,hostname',
  colorize: false,
  translateTime: 'SYS:dd/mm/yyyy HH:MM:ss',
};

export const logger = pino({
  serializers: {
    req(request) {
      return {
        method: request.method,
        url: request.url,
        parameters: request.params,
        searchParams: request.query,
        hostname: request.hostname,
      };
    },
  },
  transport: {
    targets: [
      {
        level: 'error',
        target: 'pino-pretty',
        options: {
          destination: path.join(__dirname, '../../../errors.log'),
          ...pinoPrettySettings,
        },
      },
      {
        level: loggingLevel(LOGGER_LVL),
        target: 'pino-pretty',
        options: {
          destination: path.join(__dirname, '../../../combined.log'),
          ...pinoPrettySettings,
        },
      },
      {
        level: loggingLevel(LOGGER_LVL),
        target: 'pino-pretty',
        options: {
          destination: 1,
          ...pinoPrettySettings,
          colorize: true,
        },
      },
    ],
  },
});

export const handleLogging = (server: FastifyInstance) => {
  process.on('uncaughtExceptionMonitor', (err, origin) => {
    logger.fatal(err, origin);

    process.exit(1);
  });

  server.addHook('preHandler', (req, _, done) => {
    if (req.body) {
      req.log.info({ body: req.body }, 'request parsed body');
    }
    done();
  });

  server.setErrorHandler((err, _, reply) => {
    if (err.validation) {
      logger.warn(err);
      reply.status(statusCodes.NOT_FOUND).send({
        message: `${err.validation[0].dataPath} ${err.validation[0].message}`,
      });
    } else {
      logger.error(err);
      reply
        .status(statusCodes.INTERNAL_ERROR)
        .send({ message: 'Error occurred during request' });
    }
  });

  server.setNotFoundHandler((request, reply) => {
    logger.warn(`Route ${request.url} not found`);

    reply
      .status(statusCodes.NOT_FOUND)
      .send({ message: `Not found ${request.url}` });
  });
};
