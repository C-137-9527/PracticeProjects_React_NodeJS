const express = require('express');
const Router = express.Router();
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require('../controllers/task');

Router.route('/').get(getAllTasks).post(createTask);

Router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = Router;
