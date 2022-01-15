import {
  getAllTasks,
  getTask,
  updateTask,
  addTask,
  removeTask,
} from './task.service';

const Task = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    order: { type: 'number' },
    description: { type: 'string' },
    userId: { type: ['string', 'null'] },
    boardId: { type: 'string' },
    columnId: { type: ['string', 'null'] },
  },
};

const TaskBody = {
  type: 'object',
  required: ['title', 'order', 'description', 'userId'],
  properties: {
    title: { type: 'string' },
    order: { type: 'number' },
    description: { type: 'string' },
    userId: { type: ['string', 'null'] },
    columnId: { type: ['string', 'null'] },
    boardId: { type: 'string' },
  },
};

export const getTasksOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Task,
      },
    },
  },
  handler: getAllTasks,
};

export const getTaskOpts = {
  schema: {
    response: {
      200: Task,
    },
  },
  handler: getTask,
};

export const postTaskOpts = {
  schema: {
    body: TaskBody,
    response: {
      201: Task,
    },
  },
  handler: addTask,
};

export const deleteTaskOpts = {
  handler: removeTask,
};

export const putTaskOpts = {
  schema: {
    body: TaskBody,
    response: {
      200: Task,
    },
  },
  handler: updateTask,
};
