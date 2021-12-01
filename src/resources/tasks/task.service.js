const { v4: uuidv4 } = require('uuid');
const tasksRepo = require('./task.memory.repository');

const getAllTasks = async (req, reply) => {
  const { boardId } = req.params;
  const tasks = await tasksRepo.getAll(boardId);

  if (!tasks) {
    reply.code(404).send('Board not found');
  } else {
    reply.send(tasks);
  }
};

const getTask = async (req, reply) => {
  const { taskId, boardId } = req.params;
  const task = await tasksRepo.getOne(boardId, taskId);
  if (!task) {
    reply.code(404).send('Task not found');
  } else {
    reply.send(task);
  }
};

const addTask = async (req, reply) => {
  const { boardId } = req.params;
  const newTask = { ...req.body, id: uuidv4() };
  const task = await tasksRepo.add(boardId, newTask);
  if (!task) {
    reply.code(404).send('Board not found');
  } else {
    reply.code(201).send(task);
  }
};

const removeTask = async (req, reply) => {
  const { taskId, boardId } = req.params;
  const taskIndex = await tasksRepo.remove(taskId, boardId);
  if (taskIndex < 0) {
    reply.code(404).send('Task not found');
  } else {
    reply.code(204);
  }
};

const updateTask = async (req, reply) => {
  const { taskId, boardId } = req.params;
  const task = await tasksRepo.update(taskId, boardId, req.body);
  if (!task) {
    reply.code(404).send('Task not found');
  } else {
    reply.send(task);
  }
};

module.exports = { getAllTasks, getTask, addTask, removeTask, updateTask };
