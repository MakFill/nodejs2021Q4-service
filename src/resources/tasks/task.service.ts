import { FastifyRequest, FastifyReply } from 'fastify';
import { Task } from './task.model';
import { ITaskReqBody, ITaskReqParam, ITaskResBody } from '../interfaces';
import { tasksRepo } from './task.memory.repository';
import { statusCodes } from '../utils';

/**
 * Async get all tasks from DB by req.params and sent them to front side.
 * @param req - request from front side FastifyRequest.
 * @param reply - response to front side FastifyReply.
 * @returns void
 */

export const getAllTasks = async (req: FastifyRequest, reply: FastifyReply) => {
  const { boardId } = req.params as ITaskReqParam;
  const tasks = await tasksRepo.getAll(boardId);

  if (tasks === null) {
    reply.code(statusCodes.NOT_FOUND).send('Board not found');
  } else {
    reply.send(tasks);
  }
};

/**
 * Async get one task from DB by req.params and sent it to front side.
 * @param req - request from front side FastifyRequest.
 * @param reply - response to front side FastifyReply.
 * @returns void
 */

export const getTask = async (req: FastifyRequest, reply: FastifyReply) => {
  const { taskId, boardId } = req.params as ITaskReqParam;
  const task = await tasksRepo.getOne(boardId, taskId);
  if (task === null) {
    reply.code(statusCodes.NOT_FOUND).send('Task not found');
  } else {
    reply.send(task);
  }
};

/**
 * Async add one task to DB by req.body and by req.params and sent it to front side.
 * @param req - request from front side FastifyRequest.
 * @param reply - response to front side FastifyReply.
 * @returns void
 */

export const addTask = async (req: FastifyRequest, reply: FastifyReply) => {
  const { boardId } = req.params as ITaskReqParam;
  const newTask: ITaskResBody = new Task(req.body as ITaskReqBody);
  const task = await tasksRepo.add(boardId, newTask);
  if (task === null) {
    reply.code(statusCodes.NOT_FOUND).send('Board not found');
  } else {
    reply.code(statusCodes.ADDED).send(task);
  }
};

/**
 * Async remove one task from DB by req.params.
 * @param req - request from front side FastifyRequest.
 * @param reply - response to front side FastifyReply.
 * @returns void
 */

export const removeTask = async (req: FastifyRequest, reply: FastifyReply) => {
  const { taskId, boardId } = req.params as ITaskReqParam;
  const taskIndex = await tasksRepo.remove(taskId, boardId);
  if (taskIndex === null) {
    reply.code(statusCodes.NOT_FOUND).send('Task and/or Board not found');
  } else {
    reply.code(statusCodes.DELETED);
  }
};

/**
 * Async update one task in DB by req.params + req.body and sent it to front side.
 * @param req - request from front side FastifyRequest.
 * @param reply - response to front side FastifyReply.
 * @returns void
 */

export const updateTask = async (req: FastifyRequest, reply: FastifyReply) => {
  const { taskId, boardId } = req.params as ITaskReqParam;
  const newTask = new Task(req.body as ITaskReqBody);
  const task = await tasksRepo.update(taskId, boardId, newTask);
  if (task === null) {
    reply.code(statusCodes.NOT_FOUND).send('Task and/or Board not found');
  } else {
    reply.send(task);
  }
};
