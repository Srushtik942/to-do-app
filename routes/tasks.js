const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');

// get tasks
router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ user: req.userId }).sort({ deadline: 1, priority: -1 });
  res.json(tasks);
});

// create
router.post('/', auth, async (req, res) => {
  const { title, description, datetime, deadline, priority } = req.body;
  const task = new Task({ user: req.userId, title, description, datetime, deadline, priority });
  await task.save();
  res.json(task);
});

// update (toggle complete or edit)
router.put('/:id', auth, async (req, res) => {
  const task = await Task.findOneAndUpdate({ _id: req.params.id, user: req.userId }, req.body, { new: true });
  if (!task) return res.status(404).json({ msg: 'Not found' });
  res.json(task);
});

// delete
router.delete('/:id', auth, async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
  if (!task) return res.status(404).json({ msg: 'Not found' });
  res.json({ msg: 'Deleted' });
});

module.exports = router;
