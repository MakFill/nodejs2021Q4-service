import { FastifyInstance } from 'fastify';
import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import connectionOptions from './ormconfig';

export const pgConnect = async (
  server: FastifyInstance
): Promise<Connection> => {
  try {
    const connection = await createConnection(
      connectionOptions as ConnectionOptions
    );

    server.log.info('DB is connected');

    return connection;
  } catch (err) {
    throw new Error(`DB is not connected.
    ${err}`);
  }
};
