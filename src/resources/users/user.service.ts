import { FastifyRequest, FastifyReply } from 'fastify';
import { getConnection } from 'typeorm';
import { server } from '../../app';
import { IUserReqParam } from '../interfaces';
import { statusCodes } from '../../common/utils';
import { UserRepo } from './user.memory.repository';
import { UserEntity } from './user.model';

/**
 * Async get all users from DB and sent them to front side.
 * @param _ - unused param for request from front side FastifyRequest.
 * @param reply - response to front side FastifyReply.
 * @returns void
 */

export const getAllUsers = async (_: FastifyRequest, reply: FastifyReply) => {
  const usersRepo = getConnection().getCustomRepository(UserRepo);
  const users: UserEntity[] = await usersRepo.getAll();
  reply.send(users);
  server.log.info('Get all Users from DB');
};

/**
 * Async get one user from DB by req.params and sent it to front side.
 * @param req - request from front side FastifyRequest.
 * @param reply - response to front side FastifyReply.
 * @returns void
 */

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

/**
 * Async add one user to DB by req.body and sent it to front side.
 * @param req - request from front side FastifyRequest.
 * @param reply - response to front side FastifyReply.
 * @returns void
 */

export const addUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const usersRepo = getConnection().getCustomRepository(UserRepo);
  const user: UserEntity | undefined = await usersRepo.add(
    req.body as Partial<UserEntity>
  );
  reply.code(statusCodes.ADDED).send(user);
  server.log.info('User added to DB');
};

// /**
//  * Async remove one user from DB by req.params.
//  * @param req - request from front side FastifyRequest.
//  * @param reply - response to front side FastifyReply.
//  * @returns void
//  */

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

// /**
//  * Async update one user in DB by req.params + req.body and sent it to front side.
//  * @param req - request from front side FastifyRequest.
//  * @param reply - response to front side FastifyReply.
//  * @returns void
//  */

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
