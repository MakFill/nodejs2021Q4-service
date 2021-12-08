import { FastifyRequest, FastifyReply } from 'fastify';
import { IUserReqBody, IUserReqParam } from '../interfaces';
import { usersRepo } from './user.memory.repository';
import { User } from './user.model';

export const getAllUsers = async (_: FastifyRequest, reply: FastifyReply) => {
  const users: IUserReqBody[] = await usersRepo.getAll();
  reply.send(users.map((el) => User.toResponse(el)));
};

export const getUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const { userId } = req.params as IUserReqParam;
  const user: IUserReqBody | undefined = await usersRepo.getOne(userId);
  if (!user) {
    reply.code(404).send('User not found');
  } else {
    reply.send(User.toResponse(user));
  }
};

export const addUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const newUser: IUserReqBody = new User(req.body as IUserReqBody);
  const user: IUserReqBody = await usersRepo.add(newUser);
  reply.code(201).send(User.toResponse(user));
};

export const removeUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const { userId } = req.params as IUserReqParam;
  const userIndex = await usersRepo.remove(userId);
  if (userIndex < 0) {
    reply.code(404).send('User not found');
  } else {
    reply.code(204);
  }
};

export const updateUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const { userId } = req.params as IUserReqParam;
  const newUser: IUserReqBody = new User(req.body as IUserReqBody);
  const user: IUserReqBody | null = await usersRepo.update(userId, newUser);
  if (!user) {
    reply.code(404).send('User not found');
  } else {
    reply.send(User.toResponse(user));
  }
};
