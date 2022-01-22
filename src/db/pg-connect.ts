import { FastifyInstance } from 'fastify';
import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import { UserRepo } from '../resources/users/user.memory.repository';
import connectionOptions from './ormconfig';

export const pgConnect = async (
  server: FastifyInstance
): Promise<Connection> => {
  try {
    const connection = await createConnection(
      connectionOptions as ConnectionOptions
    );

    server.log.info('DB is connected');

    const usersRepo = connection.getCustomRepository(UserRepo);

    const admin = await usersRepo.getUserByLogin('admin');

    if (!admin) {
      await usersRepo.add({
        name: 'admin',
        login: 'admin',
        password: 'admin',
      });
      server.log.info('Admin added to DB');
    }

    return connection;
  } catch (err) {
    throw new Error(`DB is not connected.
    ${err}`);
  }
};
