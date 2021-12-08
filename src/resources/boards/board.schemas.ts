import {
  getAllBoards,
  getBoard,
  updateBoard,
  addBoard,
  removeBoard,
} from './board.service';

const Board = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    columns: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          order: { type: 'number' },
        },
      },
    },
  },
};

const BoardBody = {
  type: 'object',
  required: ['title', 'columns'],
  properties: {
    title: { type: 'string' },
    columns: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          order: { type: 'number' },
        },
      },
    },
  },
};

export const getBoardsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Board,
      },
    },
  },
  handler: getAllBoards,
};

export const getBoardOpts = {
  schema: {
    response: {
      200: Board,
    },
  },
  handler: getBoard,
};

export const postBoardOpts = {
  schema: {
    body: BoardBody,
    response: {
      201: Board,
    },
  },
  handler: addBoard,
};

export const deleteBoardOpts = {
  handler: removeBoard,
};

export const putBoardOpts = {
  schema: {
    body: BoardBody,
    response: {
      200: Board,
    },
  },
  handler: updateBoard,
};
