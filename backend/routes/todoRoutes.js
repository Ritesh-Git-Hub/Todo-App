// routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const {
  getTodos,
  createTodo,
  updateTodo,
  toggleComplete,
  deleteTodo,
} = require('../controllers/todoController');

router.get('/', getTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.patch('/:id/toggle', toggleComplete);
router.delete('/:id', deleteTodo);

module.exports = router;

