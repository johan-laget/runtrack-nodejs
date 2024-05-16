const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', (req, res) => {
  const tasks = controller.getAllTasks();
  res.json(tasks);
});

router.post('/', (req, res) => {
  const { title, description, status } = req.body;
  const newTask = controller.addTask(title, description, status);
  res.status(201).json(newTask);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const updatedTask = controller.updateTask(id, title, description, status);
  if (!updatedTask) return res.status(404).send('Task not found');
  res.json(updatedTask);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  controller.deleteTask(id);
  res.send('Task deleted successfully');
});

module.exports = router;
