import {
  getAllBoards,
  getBoard,
  updateBoard,
  addBoard,
  removeBoard,
  getAllColumns,
} from './board.service';

const Column = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    order: { type: 'number' },
  },
};

const Board = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    columns: {
      type: 'array',
      items: Column,
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
      items: Column,
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

export const getColumnssOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Column,
      },
    },
  },
  handler: getAllColumns,
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
