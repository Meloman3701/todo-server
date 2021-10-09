const express = require('express');
const router = express.Router();
const multer = require('multer');
const TodoModel = require('../models/todo');

router.get('/', async (req, res) => {
  const todos = await TodoModel.find();
  res.send(todos);
})

router.get('/:id', async (req, res) => {
  const item = await TodoModel.findById(req.params.id);
  res.send(item);
});

router.post('/', multer().none(), async (req, res) => {
  const { title } = req.body;

  if (!title) {
    res.statusCode = 500;
    res.statusMessage = 'Title is required'
    res.send();
  }

  const todo = new TodoModel({ title });
  await todo.save();
  const todos = await TodoModel.find();

  res.send(todos)
});

router.delete('/:id', async (req, res) => {
  await TodoModel.deleteOne({ _id: req.params.id });
  res.send()
})

module.exports = router;
