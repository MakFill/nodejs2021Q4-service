import { FastifyRequest, FastifyReply } from 'fastify';
import { Task } from './task.model';
import { ITaskReqBody, ITaskReqParam, ITaskResBody } from '../interfaces';
import { tasksRepo } from './task.memory.repository';

export const getAllTasks = async (req: FastifyRequest, reply: FastifyReply) => {
  const { boardId } = req.params as ITaskReqParam;
  const tasks = await tasksRepo.getAll(boardId);

  if (tasks === null) {
    reply.code(404).send('Board not found');
  } else {
    reply.send(tasks);
  }
};

export const getTask = async (req: FastifyRequest, reply: FastifyReply) => {
  const { taskId, boardId } = req.params as ITaskReqParam;
  const task = await tasksRepo.getOne(boardId, taskId);
  if (task === null) {
    reply.code(404).send('Task not found');
  } else {
    reply.send(task);
  }
};

export const addTask = async (req: FastifyRequest, reply: FastifyReply) => {
  const { boardId } = req.params as ITaskReqParam;
  const newTask: ITaskResBody = new Task(req.body as ITaskReqBody);
  const task = await tasksRepo.add(boardId, newTask);
  if (task === null) {
    reply.code(404).send('Board not found');
  } else {
    reply.code(201).send(task);
  }
};

export const removeTask = async (req: FastifyRequest, reply: FastifyReply) => {
  const { taskId, boardId } = req.params as ITaskReqParam;
  const taskIndex = await tasksRepo.remove(taskId, boardId);
  if (taskIndex === null) {
    reply.code(404).send('Task and/or Board not found');
  } else {
    reply.code(204);
  }
};

export const updateTask = async (req: FastifyRequest, reply: FastifyReply) => {
  const { taskId, boardId } = req.params as ITaskReqParam;
  const newTask = new Task(req.body as ITaskReqBody);
  const task = await tasksRepo.update(taskId, boardId, newTask);
  if (task === null) {
    reply.code(404).send('Task and/or Board not found');
  } else {
    reply.send(task);
  }
};
