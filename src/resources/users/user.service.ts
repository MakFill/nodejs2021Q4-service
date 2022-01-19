import { FastifyRequest, FastifyReply } from 'fastify';
import { getConnection } from 'typeorm';
import { server } from '../../app';
import { IUserReqParam } from '../interfaces';
import { statusCodes } from '../../common/utils';
import { UserRepo } from './user.memory.repository';
import { UserEntity } from './user.model';

export const getAllUsers = async (_: FastifyRequest, reply: FastifyReply) => {
  const usersRepo = getConnection().getCustomRepository(UserRepo);
  const users: UserEntity[] = await usersRepo.getAll();
  reply.send(users);
  server.log.info('Get all Users from DB');
};

export const getUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const { userId } = req.params as IUserReqParam;
  const usersRepo = getConnection().getCustomRepository(UserRepo);
  const user: UserEntity | undefined = await usersRepo.getOne(userId);
  if (!user) {
    reply.code(statusCodes.NOT_FOUND).send('User not found');
    server.log.warn(`User ${userId} not found`);
  } else {
    reply.send(user);
    server.log.info(`Get User ${userId} from DB`);
  }
};

export const addUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const usersRepo = getConnection().getCustomRepository(UserRepo);
  const user: UserEntity | undefined = await usersRepo.add(
    req.body as Partial<UserEntity>
  );
  reply.code(statusCodes.ADDED).send(user);
  server.log.info('User added to DB');
};

export const removeUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const usersRepo = getConnection().getCustomRepository(UserRepo);
  const { userId } = req.params as IUserReqParam;
  const user = await usersRepo.removeUser(userId);
  if (!user.affected) {
    reply.code(statusCodes.NOT_FOUND).send('User not found');
    server.log.warn(`User ${userId} not found and doesn't removed from DB`);
  } else {
    reply.code(statusCodes.DELETED);
    server.log.info(`User ${userId} removed from DB`);
  }
};

export const updateUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const usersRepo = getConnection().getCustomRepository(UserRepo);
  const { userId } = req.params as IUserReqParam;
  const newUser: UserEntity | undefined = await usersRepo.updateUser(
    userId,
    req.body as Partial<UserEntity>
  );
  if (!newUser) {
    reply.code(statusCodes.NOT_FOUND).send(`User ${userId} not found`);
    server.log.warn(`User ${userId} not found and doesn't updated`);
  } else {
    reply.send(newUser);
    server.log.info(`User ${userId} updated`);
  }
};
