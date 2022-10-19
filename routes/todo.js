const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const TodosController = require('../controllers/todo.controller');
const todosController = new TodosController;

// todo 만들기
router.post('/', authMiddleware, todosController.createTodo);
// todo 삭제
router.delete('/', authMiddleware, todosController.deleteTodo);
// todo 클리어
router.put('/', authMiddleware, todosController.clearTodo);

module.exports = router;