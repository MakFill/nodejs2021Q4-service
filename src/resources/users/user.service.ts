import { FastifyRequest, FastifyReply } from 'fastify';
import { IUserReqBody, IUserReqParam, IUserResBody } from '../interfaces';
import { statusCodes } from '../utils';
import { usersRepo } from './user.memory.repository';
import { User } from './user.model';

/**
 * Async get all users from DB and sent them to front side.
 * @param _ - unused param for request from front side FastifyRequest.
 * @param reply - response to front side FastifyReply.
 * @returns void
 */

export const getAllUsers = async (_: FastifyRequest, reply: FastifyReply) => {
  const users: IUserResBody[] = await usersRepo.getAll();
  reply.send(users);
};

/**
 * Async get one user from DB by req.params and sent it to front side.
 * @param req - request from front side FastifyRequest.
 * @param reply - response to front side FastifyReply.
 * @returns void
 */

export const getUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const { userId } = req.params as IUserReqParam;
  const user: IUserReqBody | undefined = await usersRepo.getOne(userId);
  if (!user) {
    reply.code(statusCodes.NOT_FOUND).send('User not found');
  } else {
    reply.send(user);
  }
};

/**
 * Async add one user to DB by req.body and sent it to front side.
 * @param req - request from front side FastifyRequest.
 * @param reply - response to front side FastifyReply.
 * @returns void
 */

export const addUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const newUser: IUserResBody = new User(req.body as IUserReqBody);
  const user: IUserResBody = await usersRepo.add(newUser);
  reply.code(statusCodes.ADDED).send(user);
};

/**
 * Async remove one user from DB by req.params.
 * @param req - request from front side FastifyRequest.
 * @param reply - response to front side FastifyReply.
 * @returns void
 */

export const removeUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const { userId } = req.params as IUserReqParam;
  const userIndex = await usersRepo.remove(userId);
  if (userIndex < 0) {
    reply.code(statusCodes.NOT_FOUND).send('User not found');
  } else {
    reply.code(statusCodes.DELETED);
  }
};

/**
 * Async update one user in DB by req.params + req.body and sent it to front side.
 * @param req - request from front side FastifyRequest.
 * @param reply - response to front side FastifyReply.
 * @returns void
 */

export const updateUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const { userId } = req.params as IUserReqParam;
  const user: IUserResBody = new User(req.body as IUserReqBody);
  const newUser: IUserResBody | null = await usersRepo.update(userId, user);
  if (!newUser) {
    reply.code(statusCodes.NOT_FOUND).send('User not found');
  } else {
    reply.send(newUser);
  }
};
