const { v4: uuidv4 } = require('uuid');
const boardsRepo = require('./board.memory.repository');

const getAllBoards = async (req, reply) => {
  const boards = await boardsRepo.getAll();
  reply.send(boards);
};

const getBoard = async (req, reply) => {
  const { boardId } = req.params;
  const board = await boardsRepo.getOne(boardId);
  if (!board) {
    reply.code(404).send('Board not found');
  } else {
    reply.send(board);
  }
};

const addBoard = async (req, reply) => {
  const newBoard = { ...req.body, id: uuidv4() };
  const board = await boardsRepo.add(newBoard);
  reply.code(201).send(board);
};

const removeBoard = async (req, reply) => {
  const { boardId } = req.params;
  const boardIndex = await boardsRepo.remove(boardId);
  if (boardIndex < 0) {
    reply.code(404).send('Board not found');
  } else {
    reply.code(204);
  }
};

const updateBoard = async (req, reply) => {
  const { boardId } = req.params;
  const board = await boardsRepo.update(boardId, req.body);
  if (!board) {
    reply.code(404).send('Board not found');
  } else {
    reply.send(board);
  }
};

module.exports = { getAllBoards, getBoard, addBoard, removeBoard, updateBoard };
