import { FastifyRequest, FastifyReply } from 'fastify';
import { IBoardReqParam, IBoardReqBody } from '../interfaces';
import { boardsRepo } from './board.memory.repository';
import { Board } from './board.model';

export const getAllBoards = async (_: FastifyRequest, reply: FastifyReply) => {
  const boards = await boardsRepo.getAll();
  reply.send(boards);
};

export const getBoard = async (req: FastifyRequest, reply: FastifyReply) => {
  const { boardId } = req.params as IBoardReqParam;
  const board = await boardsRepo.getOne(boardId);
  if (!board) {
    reply.code(404).send('Board not found');
  } else {
    reply.send(board);
  }
};

export const addBoard = async (req: FastifyRequest, reply: FastifyReply) => {
  const newBoard = new Board(req.body as IBoardReqBody);
  const board = await boardsRepo.add(newBoard);
  reply.code(201).send(board);
};

export const removeBoard = async (req: FastifyRequest, reply: FastifyReply) => {
  const { boardId } = req.params as IBoardReqParam;
  const boardIndex = await boardsRepo.remove(boardId);
  if (boardIndex < 0) {
    reply.code(404).send('Board not found');
  } else {
    reply.code(204);
  }
};

export const updateBoard = async (req: FastifyRequest, reply: FastifyReply) => {
  const { boardId } = req.params as IBoardReqParam;
  const newBoard = new Board(req.body as IBoardReqBody);
  const board = await boardsRepo.update(boardId, newBoard);
  if (!board) {
    reply.code(404).send('Board not found');
  } else {
    reply.send(board);
  }
};
