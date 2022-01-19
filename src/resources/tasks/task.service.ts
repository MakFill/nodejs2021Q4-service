import { FastifyRequest, FastifyReply } from 'fastify';
import { getConnection } from 'typeorm';
import { BoardRepo } from '../boards/board.memory.repository';
import { TaskEntity } from './task.model';
import { ITaskReqParam } from '../interfaces';
import { TaskRepo } from './task.memory.repository';
import { statusCodes } from '../../common/utils';
import { server } from '../../app';

const checkIsBoardExist = async (id: string, reply: FastifyReply) => {
  const boardsRepo = getConnection().getCustomRepository(BoardRepo);
  const board = await boardsRepo.getOne(id);
  if (!board) {
    reply.code(statusCodes.NOT_FOUND).send(`Board ${id} not found`);
    server.log.warn(`Board ${id} not found`);
  }
  return board;
};

export const getAllTasks = async (req: FastifyRequest, reply: FastifyReply) => {
  const { boardId } = req.params as ITaskReqParam;
  const board = await checkIsBoardExist(boardId, reply);
  if (board) {
    const tasksRepo = getConnection().getCustomRepository(TaskRepo);
    const tasks = await tasksRepo.getAll(boardId);
    reply.send(tasks);
    server.log.info('Get all tasks from DB');
  }
};

export const getTask = async (req: FastifyRequest, reply: FastifyReply) => {
  const { taskId, boardId } = req.params as ITaskReqParam;
  const board = await checkIsBoardExist(boardId, reply);
  if (board) {
    const tasksRepo = getConnection().getCustomRepository(TaskRepo);
    const task = await tasksRepo.getOne(boardId, taskId);
    if (!task) {
      reply.code(statusCodes.NOT_FOUND).send(`Task ${taskId} not found`);
      server.log.warn(`Task ${taskId} not found`);
    } else {
      reply.send(task);
      server.log.info(`Get task ${taskId} from DB`);
    }
  }
};

export const addTask = async (req: FastifyRequest, reply: FastifyReply) => {
  const { boardId } = req.params as ITaskReqParam;
  const board = await checkIsBoardExist(boardId, reply);
  if (board) {
    const tasksRepo = getConnection().getCustomRepository(TaskRepo);
    const task = await tasksRepo.add(boardId, req.body as Partial<TaskEntity>);
    reply.code(statusCodes.ADDED).send(task);
    server.log.info('Task added to DB');
  }
};

export const removeTask = async (req: FastifyRequest, reply: FastifyReply) => {
  const { taskId, boardId } = req.params as ITaskReqParam;
  const board = await checkIsBoardExist(boardId, reply);
  if (board) {
    const tasksRepo = getConnection().getCustomRepository(TaskRepo);
    const task = await tasksRepo.removeTask(taskId, boardId);
    if (!task.affected) {
      reply.code(statusCodes.NOT_FOUND).send(`Task ${taskId} not found`);
      server.log.warn(`Task ${taskId} not found`);
    } else {
      reply.code(statusCodes.DELETED);
      server.log.info(`Task ${taskId} removed from DB`);
    }
  }
};

export const updateTask = async (req: FastifyRequest, reply: FastifyReply) => {
  const { taskId, boardId } = req.params as ITaskReqParam;
  const board = await checkIsBoardExist(boardId, reply);
  if (board) {
    const tasksRepo = getConnection().getCustomRepository(TaskRepo);
    const task = await tasksRepo.updateTask(
      taskId,
      boardId,
      req.body as Partial<TaskEntity>
    );
    if (!task) {
      reply.code(statusCodes.NOT_FOUND).send(`Task ${taskId} not found`);
      server.log.warn(`Task ${taskId}  not found`);
    } else {
      reply.send(task);
      server.log.info(`Task ${taskId} updated`);
    }
  }
};
