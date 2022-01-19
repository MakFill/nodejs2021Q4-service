import { FastifyRequest, FastifyReply } from 'fastify';
import { getConnection } from 'typeorm';
import { ColumnEntity } from './column.model';
import { IBoardReqParam } from '../interfaces';
import { statusCodes } from '../../common/utils';
import { BoardRepo } from './board.memory.repository';
import { server } from '../../app';
import { BoardEntity } from '..';

export const getAllBoards = async (_: FastifyRequest, reply: FastifyReply) => {
  const boardsRepo = getConnection().getCustomRepository(BoardRepo);
  const boards = await boardsRepo.getAll();
  reply.send(boards);
  server.log.info('Get all Boards from DB');
};

export const getAllColumns = async (_: FastifyRequest, reply: FastifyReply) => {
  const repo = getConnection().manager.getRepository(ColumnEntity);
  const columns = await repo.find();
  reply.send(columns);
  server.log.info('Get all Columns from DB');
};

export const getBoard = async (req: FastifyRequest, reply: FastifyReply) => {
  const boardsRepo = getConnection().getCustomRepository(BoardRepo);
  const { boardId } = req.params as IBoardReqParam;
  const board = await boardsRepo.getOne(boardId);
  if (!board) {
    reply.code(statusCodes.NOT_FOUND).send(`Board ${boardId} not found`);
    server.log.warn(`Board ${boardId} not found`);
  } else {
    reply.send(board);
    server.log.info(`Get Board ${boardId} from DB`);
  }
};

export const addBoard = async (req: FastifyRequest, reply: FastifyReply) => {
  const boardsRepo = getConnection().getCustomRepository(BoardRepo);
  const board = await boardsRepo.add(req.body as Partial<BoardEntity>);
  reply.code(statusCodes.ADDED).send(board);
  server.log.info('Board added to DB');
};

export const removeBoard = async (req: FastifyRequest, reply: FastifyReply) => {
  const boardsRepo = getConnection().getCustomRepository(BoardRepo);
  const { boardId } = req.params as IBoardReqParam;
  const boardIndex = await boardsRepo.removeBoard(boardId);
  if (!boardIndex.affected) {
    reply.code(statusCodes.NOT_FOUND).send(`Board ${boardId} not found`);
    server.log.warn(`Board ${boardId} not found and doesn't removed from DB`);
  } else {
    reply.code(statusCodes.DELETED);
    server.log.info(`Board ${boardId} removed from DB`);
  }
};

export const updateBoard = async (req: FastifyRequest, reply: FastifyReply) => {
  const boardsRepo = getConnection().getCustomRepository(BoardRepo);
  const { boardId } = req.params as IBoardReqParam;
  const board = await boardsRepo.updateBoard(
    boardId,
    req.body as Partial<BoardEntity>
  );
  if (!board) {
    reply.code(statusCodes.NOT_FOUND).send(`Board ${boardId} not found`);
    server.log.warn(`Board ${boardId} not found and doesn't updated`);
  } else {
    reply.send(board);
    server.log.info(`Board ${boardId} updated`);
  }
};
