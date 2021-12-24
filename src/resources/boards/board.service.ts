import { FastifyRequest, FastifyReply } from 'fastify';
import { IBoardReqParam, IBoardReqBody } from '../interfaces';
import { statusCodes } from '../../common/utils';
import { boardsRepo } from './board.memory.repository';
import { Board } from './board.model';
import { server } from '../../app';

/**
 * Async get all boards from DB and sent them to front side.
 * @param _ - unused param for request from front side FastifyRequest.
 * @param reply - response to front side FastifyReply.
 * @returns void
 */

export const getAllBoards = async (_: FastifyRequest, reply: FastifyReply) => {
  const boards = await boardsRepo.getAll();
  reply.send(boards);
  server.log.info('Get all Boards from DB');
};

/**
 * Async get one board from DB by req.params and sent it to front side.
 * @param req - request from front side FastifyRequest.
 * @param reply - response to front side FastifyReply.
 * @returns void
 */

export const getBoard = async (req: FastifyRequest, reply: FastifyReply) => {
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

/**
 * Async add one board to DB by req.body and sent it to front side.
 * @param req - request from front side FastifyRequest.
 * @param reply - response to front side FastifyReply.
 * @returns void
 */

export const addBoard = async (req: FastifyRequest, reply: FastifyReply) => {
  const newBoard = new Board(req.body as IBoardReqBody);
  const board = await boardsRepo.add(newBoard);
  reply.code(statusCodes.ADDED).send(board);
  server.log.info('Board added to DB');
};

/**
 * Async remove one board from DB by req.params.
 * @param req - request from front side FastifyRequest.
 * @param reply - response to front side FastifyReply.
 * @returns void
 */

export const removeBoard = async (req: FastifyRequest, reply: FastifyReply) => {
  const { boardId } = req.params as IBoardReqParam;
  const boardIndex = await boardsRepo.remove(boardId);
  if (boardIndex < 0) {
    reply.code(statusCodes.NOT_FOUND).send(`Board ${boardId} not found`);
    server.log.warn(`Board ${boardId} not found and doesn't removed from DB`);
  } else {
    reply.code(statusCodes.DELETED);
    server.log.info(`Board ${boardId} removed from DB`);
  }
};

/**
 * Async update one board in DB by req.params + req.body and sent it to front side.
 * @param req - request from front side FastifyRequest.
 * @param reply - response to front side FastifyReply.
 * @returns void
 */

export const updateBoard = async (req: FastifyRequest, reply: FastifyReply) => {
  const { boardId } = req.params as IBoardReqParam;
  const newBoard = new Board(req.body as IBoardReqBody);
  const board = await boardsRepo.update(boardId, newBoard);
  if (!board) {
    reply.code(statusCodes.NOT_FOUND).send(`Board ${boardId} not found`);
    server.log.warn(`Board ${boardId} not found and doesn't updated`);
  } else {
    reply.send(board);
    server.log.info(`Board ${boardId} updated`);
  }
};
