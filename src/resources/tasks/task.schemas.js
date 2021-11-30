const {
  getAllTasks,
  getTask,
  updateTask,
  addTask,
  removeTask,
} = require('./task.service');

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
  required: ['title', 'order', 'description', 'userId', 'columnId'],
  properties: {
    title: { type: 'string' },
    order: { type: 'number' },
    description: { type: 'string' },
    userId: { type: ['string', 'null'] },
    columnId: { type: ['string', 'null'] },
  },
};

const getTasksOpts = {
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

const getTaskOpts = {
  schema: {
    response: {
      200: Task,
    },
  },
  handler: getTask,
};

const postTaskOpts = {
  schema: {
    body: TaskBody,
    response: {
      201: Task,
    },
  },
  handler: addTask,
};

const deleteTaskOpts = {
  handler: removeTask,
};

const putTaskOpts = {
  schema: {
    body: TaskBody,
    response: {
      200: Task,
    },
  },
  handler: updateTask,
};

module.exports = {
  getTasksOpts,
  getTaskOpts,
  postTaskOpts,
  deleteTaskOpts,
  putTaskOpts,
};
